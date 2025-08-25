import { useEffect, useRef, useState } from 'react';

// Dùng ảnh sẵn có trong public/images
const slides = [
	{ id: 1, src: '/images/iphone15promax.jpg', alt: 'iPhone 15 Pro Max - Ưu đãi hot' },
	{ id: 2, src: '/images/galaxys23ultra.jpg', alt: 'Galaxy S23 Ultra - Siêu camera' },
	{ id: 3, src: '/images/galaxyzfold5.jpg', alt: 'Galaxy Z Fold 5 - Gập mở tương lai' },
];

export default function HeroSlider() {
	const [index, setIndex] = useState(0);
	const timerRef = useRef(null);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (paused) return;
		timerRef.current = setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, 3500);
		return () => clearInterval(timerRef.current);
	}, [paused]);

	return (
		<div
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden', marginBottom: 16, borderRadius: 12 }}
		>
			{slides.map((s, i) => (
				<img
					key={s.id}
					src={s.src}
					alt={s.alt}
					onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x300?text=Banner'; }}
					style={{
						position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
						opacity: i === index ? 1 : 0, transition: 'opacity .6s ease',
					}}
				/>
			))}

			{/* Overlay mờ để chữ/nút nổi bật */}
			<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.35))' }} />

			{/* Nút Prev/Next */}
			<button
				onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
				aria-label="Previous slide"
				style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
			>
				‹
			</button>
			<button
				onClick={() => setIndex((index + 1) % slides.length)}
				aria-label="Next slide"
				style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
			>
				›
			</button>

			{/* Dots điều hướng */}
			<div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
				{slides.map((s, i) => (
					<button
						key={s.id}
						onClick={() => setIndex(i)}
						aria-label={`Go to slide ${i + 1}`}
						style={{
							width: i === index ? 18 : 10,
							height: 10,
							borderRadius: 999,
							border: 'none',
							cursor: 'pointer',
							background: i === index ? 'white' : 'rgba(255,255,255,0.6)',
							transition: 'all .2s',
						}}
					/>
				))}
			</div>
		</div>
	);
}


