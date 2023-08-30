import Particles from "react-tsparticles"
import particlesConfigs from "./particle-config"

const ParticlesBackground = () =>{
    return (
        <Particles params={particlesConfigs}>
        </Particles>
    );
}

export default ParticlesBackground;