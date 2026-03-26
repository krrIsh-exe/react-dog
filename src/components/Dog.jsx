// hooks must be inside the canvas element

import React, { useEffect ,useRef } from 'react'
import * as THREE from "three"
import { Canvas,useThree } from '@react-three/fiber'
import { OrbitControls , useGLTF ,useTexture,useAnimations} from '@react-three/drei'
// import { Environment } from "@react-three/drei"
import { texture } from 'three/tsl'
// import { color, sample, texture } from 'three/tsl'
// import { DirectionalLight } from 'three'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import {ScrollTrigger  } from "gsap/ScrollTrigger";



gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)


const Dog = () => {

const model = useGLTF("/Models/dog.drc.glb")

useThree(({camera,scene,gl}) =>{
  camera.position.z = 0.6
  gl.toneMapping = THREE.ReinhardToneMapping
  gl.toneMapping = THREE.ACESFilmicToneMapping
  gl.toneMappingExposure = 1.2   // reduce brightness
  gl.outputColorSpace = THREE.SRGBColorSpace
},[])

// THis hook is FOr Animation
const {actions}=useAnimations (model.animations,model.scene)

useEffect(()=>{
  actions["Take 001"]?.play()
},[actions])

// from here we started normal mapping and using matacap material


const [normalMap, SampleMatCap,branchMap, branchNormalMap] = useTexture([
  "/dog_normals.jpg",
  "/matcap/mat-2.png",
  "/branches_diffuse.jpg",
  "/branches_normals.jpg"
])

  branchMap.flipY = false
  branchNormalMap.flipY = false
  normalMap.flipY = false
  normalMap.colorSpace = THREE.NoColorSpace
  SampleMatCap.flipY = false
  SampleMatCap.colorSpace = THREE.SRGBColorSpace




// here we are trying to make material once and then use it when ever we wanted


const dogMaterial =  new THREE.MeshMatcapMaterial({     
    normalMap:normalMap,
    matcap:SampleMatCap,  
    transparent:false,
    })

const branchMAterial = new THREE.MeshMatcapMaterial({
  normalMap :branchNormalMap,
  map:branchMap
})




useEffect(()=>{
model.scene.traverse((child) =>{
  if (child.name.includes("DOG")){
    child.material = dogMaterial
  }else{
    child.material= branchMAterial
  }
})
},[model,normalMap,SampleMatCap])

const refmodel = useRef()            // here we are using the refference of the actual dog model which we loaded using gltf 
                                          // hence that dog model is saved inside that ref model





useGSAP(()=>{

const tl =gsap.timeline({
  scrollTrigger:{
    trigger:"#section1",
    endTrigger:"#section3",
    start:"top top",                             // it is used to tell from where animation will be started
    end:"bottom bottom",                        // it is used to tell till where animation will be continue
    markers:true,
    scrub:true
  }
  })
      tl
            .to(refmodel.current.position, {
                z: "-=0.75",
                y: "+=0.1"
            })
            .to(refmodel.current.rotation, {
                x: `+=${Math.PI / 15}`
            })
            .to(refmodel.current.rotation, {
                y: `-=${Math.PI}`,

            }, "third")
            .to(refmodel.current.position, {
                x: "-=0.5",
                z: "+=0.6",
                y: "-=0.05"
            }, "third")

},[]);


return (

//  this section is for the orbit controls rotation position and lighting 

<> 
  <primitive object = {model.scene} 
    scale={1.2}
  ref={refmodel} // <--- Add this! This links the 3D object to your ref
  position={[0.2,-0.69,0]} 
  rotation={[0,Math.PI/+3.5,0]} />
</>
  )
}

export default Dog




// how can we load normal map first we have to load image in this jsx
// for that we will make constant use texture give image path and then 
// just like how we crated material for dog once and used it many times
//we will create material for branches
// we will make meshcap material for the map and branch map then 
// we will do traverse part where we will put else condition because we
// only have two things one is dog and second is  branch 


// vertical y axis 
//horizontal is x axis 
// and for the depth we uses z axis 


// 1. Markers
// markers is a debugging tool. It puts visual labels on your website so you can see exactly where an animation starts and ends.
// markers: true: You will see small text on the side of your screen like "start," "end," "scroller-start," and "scroller-end." It helps you see if your animation is triggering at the right time.
// markers: false: The labels are hidden. Always set this to false before you publish your website.
// 2. Scrub
// scrub links the animation's progress directly to the scrollbar.
// scrub: true: The animation moves exactly with your mouse wheel. If you stop scrolling, the animation stops. If you scroll backward, the animation plays in reverse.
// scrub: false: The animation plays like a regular movie as soon as you hit the "start" point. Even if you stop scrolling, the animation keeps playing until it finishes.
// scrub: 1 (or any number): This adds a "smoothing" effect. The animation will "catch up" to your scroll position after 1 second. This makes the movement of your 3D model feel very smooth and "expensive."

// ref  gives you  rendered object not gltf model