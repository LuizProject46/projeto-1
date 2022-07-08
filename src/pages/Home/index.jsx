import './styles.css';
import { Component } from 'react'
import { loadPosts } from '../../utils/load-posts';
import { PostsContainer } from '../../components/PostsContainer';
import {Button} from '../../components/Button'
import { TextInput } from '../../components/TextInput';
import { Loading } from '../../components/Loading';

 class Home extends Component{
   state = {
     posts : [],
     allPosts: [],
     page: 0,
     postsPerPage: 4,
     searchValue: '',

   }

   async componentDidMount(){
      await this.loadPosts()
   }

   loadPosts = async () => {
     const {page, postsPerPage} = this.state

     const postsAndPhotos = await loadPosts()
      this.setState({ 
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos
      })
   }

   loadMorePosts = () => {
      const {
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state

      const nextPage  = page + postsPerPage
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
      
      posts.push(...nextPosts)

      this.setState({posts, page: nextPage})
   }

   handleSearch = (e) =>{
    const { value } = e.target
    
    this.setState({
      searchValue: value
    })


   }

   render(){
      const {posts, page, postsPerPage, allPosts, searchValue} = this.state
      const noMorePosts = page + postsPerPage >= allPosts.length

      const filteredPosts = !!searchValue ? posts.filter(post => post.title.toUpperCase().includes(searchValue.toUpperCase())) : posts
      return (
        <section className='container'>
          <div className="search-container">
            <TextInput 
              searchValue={searchValue} 
              handleChange={this.handleSearch}
            />
          </div>
          
          {/* {!filteredPosts.length && posts.length && (
            <p>Nenhum resultado encontrado</p>
          )} */}

          {!posts.length && (
            <Loading/>
          )}

          {filteredPosts.length > 0 && (
            <PostsContainer posts={filteredPosts}/>
          )}
          
          <div className='button-container'>
            {!searchValue && posts.length && (
              <Button 
              text="Load more"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
              />
            )}
           
          </div>
          
        </section>
        
      );
   }
 }

export default Home;
