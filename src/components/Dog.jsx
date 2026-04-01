// hooks must be inside the canvas element

import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations, Texture, useProgress } from '@react-three/drei'
// import { Environment } from "@react-three/drei"
import { mat2, texture } from 'three/tsl'
// import { color, sample, texture } from 'three/tsl'
// import { DirectionalLight } from 'three'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)


const Dog = () => {

  const model = useGLTF("/Models/dog.drc.glb")

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.6
    gl.toneMapping = THREE.ReinhardToneMapping
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.2   // reduce brightness
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [])

  // THis hook is FOr Animation
  const { actions } = useAnimations(model.animations, model.scene)

  useEffect(() => {
    actions["Take 001"]?.play()
  }, [actions])

  // from here we started normal mapping and using matacap material


  const [normalMap, SampleMatCap, branchMap, branchNormalMap] = useTexture([
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




  // / use texture matcap shit here
const[
  mat1,
  mat2,
  mat3,
  mat4,
  mat5,
  mat6,
  mat7,
  mat8,
  mat9,
  mat10,
  mat11,
  mat12,
  mat13,
  mat14,
  mat15,
  mat16,
  mat17,
  mat18,
  mat19,
  mat20
]= (useTexture([
"/matcap/mat-1.png",
"/matcap/mat-2.png",
"/matcap/mat-3.png",
"/matcap/mat-4.png",
"/matcap/mat-5.png",
"/matcap/mat-6.png",
"/matcap/mat-7.png",
"/matcap/mat-8.png",
"/matcap/mat-9.png",
"/matcap/mat-10.png",
"/matcap/mat-11.png",
"/matcap/mat-12.png",
"/matcap/mat-13.png",
"/matcap/mat-14.png",
"/matcap/mat-15.png",
"/matcap/mat-16.png",
"/matcap/mat-17.png",
"/matcap/mat-18.png",
"/matcap/mat-19.png",
"/matcap/mat-20.png"]).map(texture=>{
  texture.colorSpace=THREE.SRGBColorSpace
  return texture
}))

const material = useRef({
  uMatcap1:{value:mat2},
  uMatcap2:{value:mat2},
  uProgress:{value:1.0}
})




  // here we are trying to make material once and then use it when ever we wanted

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2,
    transparent: false,
  })

  const branchMAterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap
  })


  function onBeforeCompile(shader){
     shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        // Store reference to shader uniforms for GSAP animation

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",
            `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
        )

  }


  dogMaterial.onBeforeCompile=onBeforeCompile

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.name.includes("DOG")) {
        child.material = dogMaterial
      } else {
        child.material = branchMAterial
      }
    })
  }, [model, normalMap, SampleMatCap])

  const refmodel = useRef()            // here we are using the refference of the actual dog model which we loaded using gltf 
  // hence that dog model is saved inside that ref model





  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section1",
        endTrigger: "#section3",
        start: "top top",                             // it is used to tell from where animation will be started
        end: "bottom bottom",                        // it is used to tell till where animation will be continue
        markers: true,
        scrub: true
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

  }, []);

// this is for the effects on the model colorchanging
    // useEffect(()=>{
    //   document.querySelector(`.title[img-title="tomorrowland"]`).addEventListener("mouseenter",()=>{
    //     gsap.to(material.current.uProgress,{
    //       value:0.0,
    //       duration:0.3,
    //       onComplete:()=>{
    //         material.current.uprogress.value= material.current.umatcap1.value 
    //         material.current.uprogress.value =1.0
    //       }
          
    //     })
    //   })
    // })
 useEffect(() => {

        document.querySelector(`.title[img-title="tomorrowland"]`).addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat19
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="navy-pier"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat8
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="msi-chicago"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat9
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="phone"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat12
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="kikk"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat10
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="kennedy"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat8
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="opera"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat13
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.titles`).addEventListener("mouseleave", () => {

            material.current.uMatcap1.value = mat2
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })

    }, [])


  return (

    //  this section is for the orbit controls rotation position and lighting 

    <>
      <primitive object={model.scene}
        scale={1.2}
        ref={refmodel} // <--- Add this! This links the 3D object to your ref
        position={[0.2, -0.69, 0]}
        rotation={[0, Math.PI / +3.5, 0]} />
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