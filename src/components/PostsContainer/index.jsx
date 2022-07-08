import { PostCard } from "../Posts"
import './style.css'
export const PostsContainer = ({ posts }) => {
    return (
        <div className="posts">
            {posts.map( post => (
              <PostCard
                post={post} 
                key={post.id}
              />
            ))}
        </div>
    )
}