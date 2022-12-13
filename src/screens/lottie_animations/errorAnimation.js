import lottieWeb from 'lottie-web'
import pse from '../../assets/lottie/processing-success-error.json'

function errorAnimation(ref) {
	const animation = lottieWeb.loadAnimation({
		container: ref.current,
		renderer: 'svg',
		loop: false,
		autoplay: true,
		animationData: pse,
	})

    animation.playSegments([656, 810], true)
    
	return animation
}

export default errorAnimation
