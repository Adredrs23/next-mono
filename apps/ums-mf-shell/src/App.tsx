import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ErrorBoundary } from './ErrorBoundary';
const Button = React.lazy(() =>
	import('mfApp/Button').then((mod) => ({ default: mod.Button }))
);

export const App: React.ComponentType = () => (
	<div>
		<h1>Hello from Module Federation App!!!</h1>
		{/* <ErrorBoundary>
			<Button label='Hello' />
		</ErrorBoundary> */}
		<Posts />
	</div>
);

type Post = {
	id: number;
	title: string;
	body: string;
};
type Posts = Post[];

const fetchPosts = async (
	page: number,
	limit: number,
	signal?: AbortSignal
) => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/posts',
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

const Posts: React.ComponentType = () => {
	const [posts, setPosts] = useState<Posts>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const limit = 2;
	const abortController = useRef<AbortController | null>(null);

	useEffect(() => {
		// Either use abortController or the ignore method
		// let ignore = false;
		if (abortController.current) {
			abortController.current.abort();
		}
		abortController.current = new AbortController();

		setLoading(true);
		fetchPosts(page, limit, abortController.current.signal)
			.then((newPosts) => {
				// if (ignore) return;
				setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts
				setLoading(false);
			})
			.catch((error) => {
				if (axios.isCancel(error)) {
					console.log('Request canceled:', error.message); // Log cancel event
				} else {
					console.error('Error fetching posts:', error); // Handle other errors
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

	return (
		<div>
			<h1>Paginated Posts</h1>
			<button
				onClick={() => setPage((prevPage) => prevPage + 1)}
				disabled={loading}
			>
				{loading ? 'Loading...' : 'Fetch More'}
			</button>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<p>{post.id}</p>
						<h3>{post.title}</h3>
						<p>{post.body}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
