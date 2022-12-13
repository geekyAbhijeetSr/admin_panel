import lottieWeb from 'lottie-web'
import optionsAnim from '../../assets/lottie/options.json'

function optionsAnimation(ref) {
	const animation = lottieWeb.loadAnimation({
		container: ref.current,
		renderer: 'svg',
		loop: false,
		autoplay: true,
		animationData: optionsAnim,
    })
    
    animation.playSegments([0, 40], true)

	return animation
}

export default optionsAnimation
