import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Post from '../components/post';
import { useUserContext } from '../context/user';
import { getPostWithMetaByPostId } from '../services/firebase';

export default function PostPage() {
  const { postId } = useParams();
  const { user } = useUserContext();

  const [postState, setPost] = useState(null);

  useEffect(() => {
    async function getPostData() {
      const post = await getPostWithMetaByPostId(postId, user.uid);

      if (post.user.userId) {
        setPost(post);

        document.title = `${post.user.userInfo.fullName} on Instagram: "${post.post.caption}"`;
      }
    }

    if (postId) {
      getPostData();
    }
  }, [postId]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container max-w-screen-lg px-3 mx-auto">
        {postState?.user.userId ? (
          <Post postData={postState} />
        ) : (
          <Skeleton count={1} height={550} />
        )}
      </div>
    </div>
  );
}
