import './Auth.css'
function SideBar() {
  const logout =()=>{

    localStorage.removeItem("email");
   
   }
  return (
    <>
  <nav className="navbar">
  <div className="container-fluid">
    <p className=" todo"><i className="fa fa-list-alt" aria-hidden="true"></i> ToDo</p>
    
   {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
    <p class="nav-link" >{{ Auth::user()->name }}<br>{{ Auth::user()->email }}</p>
  
    <a class="nav-link" href="{{url('/addtasks')}}"><i class="fa fa-calendar" aria-hidden="true"></i> Today</a>
    <a class="nav-link" href="{{url('/donetasks')}}"><i class="fa fa-check" aria-hidden="true"></i> Done</a>
  </li> */}
   
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">

        
          <p className="nav-link" >{localStorage.getItem('email')}</p>
     

      
          <a className="nav-link" href="http://20.126.227.186:5174/todo"><i className="fa fa-calendar" aria-hidden="true"></i> Today</a>
        
          <a className="nav-link" href="http://20.126.227.186:5174/done"><i className="fa fa-check" aria-hidden="true"></i> Done</a>
</li>

        
        <li className="nav-item add">
        <a className="nav-link " href="#" onClick={logout} >
                                       <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                                    </a>

                              
          {/*<a class="nav-link " href="#"> <i class="fa fa-plus" aria-hidden="true"></i>  Add list </a>-->*/}
       
</li>
       
      </ul>
     
    </div>
  </nav>

    </>
  )
}

export default SideBar
