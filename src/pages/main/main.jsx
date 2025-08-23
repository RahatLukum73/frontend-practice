import { useMemo, useEffect, useState } from 'react';
import { PostCard, Pagination, Search } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constans';
import { getLastPageFromLinks, debounce } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchFrase, setSearchFrase] = useState('');
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchFrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			}
		);
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1000), []);

	const onSearch = ({ target }) => {
		setSearchFrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchFrase={searchFrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							)
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	


	& .posts-and-search {
	height: 100%;
	}

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
		
	}

	& .no-posts-found {
		text-align: center;
		font-size: 18px;
		margin: 20px 0 20px 0;
	}
`;
