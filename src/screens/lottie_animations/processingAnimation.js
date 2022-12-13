import pse from '../../assets/lottie/processing-success-error.json'
import lottieWeb from 'lottie-web'

function processingAnimation(ref) {
	const animation = lottieWeb.loadAnimation({
		container: ref.current,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		animationData: pse,
	})

	animation.playSegments([0, 118], true)

	return animation
}

export default processingAnimation