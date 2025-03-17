body{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.navbar {
   position:relative;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
}
.container{
    flex: 1;
}
.fa-compass{
    color:#fe424d !important;
    font-size: 2rem;
}
.nav-link{
    color:#222222 !important;
}
.Profile{
    border: 1px solid black;
    border-radius: 1rem;
    height: 3.25rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    max-width: fit-content;
}
.f-info-links a{
    text-decoration: none !important;
    color: #222222;
}
.f-info-links a:hover{
    text-decoration:underline;
}
 .f-info-links,.f-info-socials,.f-info-brand{
    width: 100%;
    vertical-align: middle !important; 
    display: flex;
    align-items: center;
    justify-content: center;
}
 .f-info-socials i{
    margin-right: 1rem;
    font-size: 1.2rem;
}  
.f-info{
    text-align: center;
    height: 8rem;
    background-color: #ebebeb;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items:space-evenly;
}
.listing-card{
    border: none !important;
    margin-bottom: 2rem;
}
.card-img-top{
    border-radius: 1rem !important;
    width: 100% !important;
    object-fit: cover !important;
}
.card-body{
    padding: 0 !important;
}
.card-text p{
    font-weight: 400 !important;
}
.listing-link{
    text-decoration: none;
}
.card-img-overlay{
    opacity: 0;
}
.card-img-overlay:hover{
    opacity:0.4;
    background-color: white;
}
.add-btn{
    background-color: #fe424d;
    border: none;
}
.edit-btn{
    background-color: #fe424d;
}

.show-img{
    margin-top: 3rem;
    height: 30vh;
}
.btns{
    display: flex;
}
.show-card{
    padding-left: 0;
    padding-right: 0;
}
.element{
    display: flex;
}
.title-container {
    text-align: center;
    width: 100%;
    margin-bottom: -1.5rem;
}

.listing-title {
    font-size: 2rem;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    display: inline-block;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.reviews-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.review-card {
    flex: 1 1 calc(33.33% - 1rem); 
    max-width: calc(33.33% - 1rem);
    min-width: 250px; 
    margin: 0.5rem;
}


body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
}


.profile-container {
    width: 60%;
    margin-top: 50px;
}


.profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.profile-icon {
    font-size: 80px; 
    color: #555;
    background-color: #f0f0f0; 
    border-radius: 50%; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ddd;
}


.profile-info h2 {
    margin: 0;
    font-size: 24px;
}

.profile-info p {
    color: gray;
    font-size: 16px;
}

.search-dropdown {
    position: absolute;
    background: white;
   
    width: 250px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
    padding: 0;
    margin-top: 5px;
}


.search-item {
    padding: 8px;
    border-bottom: 1px solid #eee;
}

.search-item a {
    text-decoration: none;
    color: black;
    display: block;
}

.search-item:hover {
    background-color: #f8f8f8;
}















































































<style>
  .btn-search {
    background-color: #fe424d;
    color: #fff;
    border-radius: 25px;
    padding: 0 1rem 0 1rem;
  }
  .btn-search i{
    display: inline;
    margin-right: 0.5rem;
  }
  .search-input{
    border-radius: 25px;
    padding: 0.5em 3rem 0.5rem 3rem;
    font-size: 1rem;
  }
</style>

<nav class="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/listings"><i class="fa-regular fa-compass"></i></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="/listings">Explore</a>
        </div>
        <div class="navbar-nav ms-auto">
          <form class="d-flex" id="search-form" action="/listings/search" method="GET">
              <input class="form-control me-2 search-input" 
                     type="search" 
                     placeholder="Search Destinations" 
                     name="q"
                     id="search-box" 
                     autocomplete="off">
              <button class="btn btn-search" type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i> Search
              </button>
          </form>
          <ul id="search-results" class="search-dropdown"></ul>
      </div>
      
    <div class="navbar-nav ms-auto">
          <a class="nav-link" href="/listings/new">Add New Destination</a>
          <% if(!currUser) { %>
          <a class="nav-link " href="/signup"><b>Sign up</b></a>
          <a class="nav-link" href="/login"><b>Log in</b></a>
          <% } %>
          <% if(currUser) { %>
          <a class="nav-link" href="/logout"><b>Log out</b></a>
          <% } %>
          <a class="nav-link Profile" href="/profile"><i class="fa-solid fa-user"></i> View Profile</a>
        </div>
      </div>
    </div>
  </nav>
  



  module.exports.updateListing =  async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !== "undefined"){//as if we not update image then it not work ,
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
    }
    await listing.save();
    console.log(listing.tag);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};