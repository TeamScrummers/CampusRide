<script>
    export let data;
    let clicked = false;
    const handleClick = ()=> clicked = !clicked;
    const resetClick = ()=> clicked = false;
</script>

<nav class={clicked? 'navbar-clicked' : 'navbar'}>
    <div class="menu-icon">
        <div class="icon-wrapper">
          <button on:click={handleClick}>
            <i class={clicked? 'fa fa-times' : 'fas fa-bars'} />
          </button>
        </div>
        <!-- Below is the image & text code -->
        {#if data.logoLink}
        <!-- <a class="logo-link-text" href={data.linkUrl}><img class='logo' src={data.logoSrc} alt={data.altText}/>{data.optionalLinkText? data.optionalLinkText : ''} </a> -->
        <h3 style = "margin-top: 0px">CampusRide</h3>
        {:else}
        <!-- <img class='logo'  src={data.logoSrc} alt={data.altText}/> -->
        {/if}
        
    </div>
    {#each data.links as link}
        {#if link.displayInNav}
        <div class={clicked? 'navbar-item-clicked' : 'navbar-item'}>
            <a color: red class='link-text' href={link.url} on:click={resetClick}>{link.linkText}</a>
        </div>
        {/if}
    {/each}

</nav>


<style> 
    a {
      color: rgb(255, 255, 255);
    }
    a:visited {
      color: rgb(255, 255, 255);
    }
    button{
      background-color: rgb(1, 32, 99);
    }
    .navbar {   
        position: fixed;
        top: 0;
        width: 100%;  
        height: 20%; 
        background-color: rgb(1, 32, 99);
        color: #FFF;   z-index: 999;  
        display: flex;   
        flex-direction: row;
        justify-content: space-around; 
        align-items: center; 
        transition: all 0.2s ease-out;
    } 
    .navbar-clicked{
        position: fixed;
        top: 0;
        width: 100%;  
        background-color: rgb(0, 46, 145);   
        color: #FFF;   z-index: 999;  
        display: flex;   
        flex-direction: row;
        justify-content: space-around; 
        align-items: center; 
        transition: all 0.2s ease-out;
        height:5em;
    }  
    
    .navbar-item {   
        display: flex;  
        height: 4em;
        color: #FFF;   
        font-size: 1.2em; 
        align-items: center;  
    } 
    .navbar-item:hover{
        border-bottom: 4px solid #fff;
        transition: all 0.2s ease-out;
    }
    .navbar-item-clicked{
        display: flex;  
        height: 4em;
        color: #FFF;   
        font-size: 1.2em; 
        align-items: center;  
    }
    .navbar-item-clicked:hover{
        color: #FFF; 
        border-bottom: 4px solid #fff;
        transition: all 0.2s ease-out;
    }
    .icon-wrapper{
        margin-top: -.5em;
        margin-right: 1em;
    }
    .menu-icon{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .fa-bars {
        display: flex;
        font-size: 2rem;
        cursor:pointer;
    }
    .fa-times {
        display: flex;
        font-size: 2rem;
        cursor:pointer;
    }
    .fa-times:hover{
        position: relative;
        box-shadow:  0 0 20px 5px #777575; 
        background-color:rgba(119, 117, 117, .58);
        transition: all 0.2s ease-out;
        border-radius: 50%;
    
    }
    .fa-bars:hover{
        position: relative;
        box-shadow:  0 0 20px 5px#777575;   
        background-color:rgba(119, 117, 117, .58);
        transition: all 0.2s ease-out;
        border-radius: 50%;
    }
    @media (max-width: 1024px) {
      /* CSS styles for tablets/mobile go here */
      button:hover{
      background-color: rgb(255, 255, 255,0);
      }
      button:focus{
        background-color: #FFF;
        color:#242424;
        transition: all 0.2s ease-out; 
      }
      a:focus{
        color:#242424;
        background-color: #FFF;
        color:#242424;
        transition: all 0.2s ease-out; 
      }
      .navbar { 
        height: 4.5em;
        width: 100vw;
        color: #FFF;   z-index: 999;  
        display: flex;   
        flex-direction: column;
        align-items: center; 
        justify-content: start; 
    
      }
      .navbar-clicked{
        height: 100vh;
        width: 100vw;
        color: #FFF;   z-index: 999;  
        display: flex;   
        flex-direction: column;
        align-items: center; 
        justify-content: start; 
      }
      .navbar-item {   
        display:none;
        } 
      .navbar-item-clicked{
        display: flex;  
        width: 100vw;
        color: #FFF;   
        font-size: 1.2em; 
        align-items: center;  
        justify-content: center;
      }
      .navbar-item-clicked:hover{
        background-color: #FFF;
        color:#242424;
        transition: all 0.2s ease-out; 
      }
      .navbar-item-clicked:hover a{
        color:#242424;
      }
      .navbar-item:hover a{   
        color:#242424;
      } 
      .navbar-item:hover{   
        background-color: #FFF;
        color:#242424;
        transition: all 0.2s ease-out;  
      } 
      .link-text{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    
      .link-text:hover{
        color:#242424;
      }
      .menu-icon{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height:3em;
        padding-top: 1em;
        padding-bottom: .5em;
      }
      .fa:hover {
        color: #242424;
      }
    
    }
    
    @media (max-width: 768px) {
        /* CSS styles for mobile phones go here */
    }
    
      
    </style> 