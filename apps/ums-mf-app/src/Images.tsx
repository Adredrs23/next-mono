import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

type Image = {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
};

type Images = Image[];

const fetchImages = async (
	page: number,
	limit: number,
	signal?: AbortSignal
) => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/photos',
		{
			params: {
				_page: page,
				_limit: limit,
			},
			signal,
		}
	);
	return response.data;
};

export const Images: React.ComponentType = () => {
	const [images, setImages] = useState<Images>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const limit = 2;
	const abortController = useRef<AbortController | null>(null);
	const [hello, setHello] = useState('hello placeholder');
	const isRun = useRef(false);

	useEffect(() => {
		// Either use abortController or the ignore method
		// let ignore = false;
		if (abortController.current) {
			abortController.current.abort();
		}
		abortController.current = new AbortController();

		setLoading(true);
		fetchImages(page, limit, abortController.current.signal)
			.then((newImages) => {
				// if (ignore) return;
				setImages((prevImages) => [...prevImages, ...newImages]); // Append new images
				setLoading(false);
			})
			.catch((error) => {
				if (axios.isCancel(error)) {
					console.log('Request canceled:', error.message); // Log cancel event
				} else {
					console.error('Error fetching images:', error); // Handle other errors
				}
				setLoading(false);
			});

		return () => {
			// ignore = true;
			if (abortController.current) {
				abortController.current.abort();
			}
		};
	}, [page]);

	useEffect(() => {
		if (isRun.current) {
			return;
		}
		isRun.current = true;

		axios
			.get('http://localhost:8000/auth/test', {
				withCredentials: true,
			})
			.then((response) => {
				// alert(response.data);
				setHello(response.data);
			});
	}, []);

	return (
		<div>
			<h1>Paginated Images</h1>
			<p>{hello}</p>
			<button
				onClick={() => setPage((prevPage) => prevPage + 1)}
				disabled={loading}
			>
				{loading ? 'Loading...' : 'Fetch More'}
			</button>
			<ul>
				{images.map((image) => (
					<li key={image.id}>
						<p>{image.id}</p>
						<h3>{image.title}</h3>
						<p>{image.url}</p>
						<img
							src={image.thumbnailUrl}
							alt={image.title}
							width={100}
							height={100}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
