// import { useState } from 'react'
// useState is a React Hook that lets a component remember data.
import './App.css'
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber'

function App() {


  return (
    <>
      <div className="background"></div>
      <main>

        <div className="images">

          <img id="tomorrowland" src="tomorrowland.png" alt="" />
          <img id="navy-pier" src="navy-pier.png" alt="" />
          <img id="msi-chicago" src="msi-chicago.png" alt="" />
          <img id="phone" src="phone.png" alt="" />
          <img id="kikk" src="kikk.png" alt="" />
          <img id="kennedy" src="kennedy.png" alt="" />
          <img id="opera" src="opera.png" alt="" />
        </div>



        <Canvas id="canvas-elem" style={{
          position: 'fixed',
          height: "100vh",
          width: "100vw",
          top: 0,
          left: 0,
          zIndex: 1,


        }}>
          <Dog />
        </Canvas>

        <div className="top">
          <section id="section1">
            <nav>

              <div className="nav-elem"><svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="premiumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#cfcfcf" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#8a9eff" />
                  </linearGradient>
                </defs>

                <text x="0" y="25"
                  fontFamily="Inter, Helvetica, Arial, sans-serif"
                  fontSize="20"
                  fontWeight="500"
                  fill="url(#premiumGrad)"
                  letterSpacing={0.8}>
                  KRRISH
                </text>

                <text x="95" y="25"
                  fontFamily="Inter, Helvetica, Arial, sans-serif"
                  fontSize="12"
                  fontWeight="400"
                  fill="#9a9a9a"
                  letterSpacing={3}>
                  STUDIO
                </text>
              </svg></div>


              <div className="nav-elem"><i className="ri-play-mini-line"></i>Our Show Reel</div>
              <div className="nav-elem second"><i className="ri-menu-fold-2-fill"></i></div>
            </nav>


            <div className="middle">
              <div className="left">
                <h1>I<br /> MAKE <br /> GOOD <br />SHIT</h1>
              </div>
              <div className="right"></div>
            </div>
            <br />
            <div className="bottom">
              <div className="bleft"></div>
              <div className="bright">
                <h2>
                  Krrishstudio is a multidisciplinary<br />
                  creative studio at the intersection<br />
                  of art, design and technology.<br />
                </h2>
                <h4>
                  Our goal is to deliver amazing experiences that make  <br />
                  people talk, and build strategic value for brands, tech, <br />
                  entertainment, arts & culture.
                </h4>
              </div>
            </div>
            <div className="fline"></div>
            <div className="sline"></div>
          </section>

          <section id="section2">
            <div className="titles">
              <div img-title="tomorrowland" className="title">
                <small>2020 - ongoing</small>
                <h1>TomorrowLand</h1>
              </div>
              <div img-title="navy-pier" className="title">
                <small>2020 - ongoing</small>
                <h1>NavyPier</h1>
              </div>

              <div img-title="msi-chicago" className="title">
                <small>2020 - ongoing</small>
                <h1>MSI Chicago</h1>
              </div>

              <div img-title="phone" className="title">
                <small>2020 - ongoing</small>
                <h1>This was Louise's Phone</h1>
              </div>

              <div img-title="kikk" className="title">
                <small>2020 - ongoing</small>
                <h1>KIKK Festival 2018</h1>
              </div>

              <div img-title="kennedy" className="title">
                <small>2020 - ongoing</small>
                <h1>The Kennedy Center</h1>
              </div>

              <div img-title="opera" className="title">
                <small>2020 - ongoing</small>
                <h1>Royal Opera of Wallonia</h1>
              </div>
            </div>


          </section>
          <section id="section3"></section>
        </div>

      </main>

    </>
  )
}

export default App



