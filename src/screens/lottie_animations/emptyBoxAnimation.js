import lottieWeb from 'lottie-web'
import emptyBox from '../../assets/lottie/empty-box.json'

function emptyBoxAnimation(ref) {
	const animation = lottieWeb.loadAnimation({
		container: ref.current,
		renderer: 'svg',
		loop: false,
		autoplay: true,
		animationData: emptyBox,
	})

	return animation
}

export default emptyBoxAnimation
