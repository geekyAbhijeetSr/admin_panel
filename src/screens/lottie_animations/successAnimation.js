import pse from '../../assets/lottie/processing-success-error.json'
import lottieWeb from 'lottie-web'

function successAnimation(ref) {
	const animation = lottieWeb.loadAnimation({
		container: ref.current,
		renderer: 'svg',
		loop: false,
		autoplay: true,
		animationData: pse,
	})

	animation.playSegments([240, 400], true)

	return animation
}

export default successAnimation