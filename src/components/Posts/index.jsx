import { PostCard } from "../PostCard"
import './style.css'
export const Posts = ({ posts = [] }) => {
    return (
        <div className="posts">
            {posts.map( post => (
              <PostCard
                title={post.title}
                cover={post.cover} 
                body={post.body}
                key={post.id}
              />
            ))}
        </div>
    )
}