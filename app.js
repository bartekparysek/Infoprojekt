{
    const hamburger = document.querySelector('.hamburger');
    const dropdownMenu = document.querySelector('ul');
    const listItems = document.querySelectorAll('.menu-items');
    const companyName = document.querySelector('.menu-cname');
    const content = document.querySelector('.content');
    const section = document.querySelector('.info');
    const form = document.getElementById('contact-form');


    const handleClick = () => {
        hamburger.classList.toggle('hm--active');
        dropdownMenu.classList.toggle('active');
    }
    hamburger.addEventListener('click', handleClick);

    const handleMenu = () =>{
        listItems.forEach( item =>{
            item.addEventListener('click', handleClick)
        });
        if(dropdownMenu.classList != 'active' && hamburger.classList != 'hm--active'){
            companyName.addEventListener('click', handleClick);
        }

    }
    handleMenu();

    function pageLoad(id){
        const url = `${id}.html`;
        const load = (url) => {
                return fetch(`../views/${url}`,{
                            headers: {
                            'Content-Type': 'text/html',
                        }
                }).then( response => {
                    return response.text().then(text => {
                        section.innerHTML = text;
                    });
                });

        }
        load(url);

    }

    function push(event){

        let id = event.target.id;
        // updates title in Window's Tab
        document.title = id;
        // Load content for this page
        pageLoad(id);
        // push state change to the address  bar
        window.history.pushState({id}, `${id}`, `${id}`);

    }

    window.onload = event =>{
        // Add history push() event when menu items clicked
        window["home"].addEventListener('click', event => push(event))
        window["kontakt"].addEventListener('click', event => push(event))
    }
    window.addEventListener("popstate", event => {
        let stateId = event.state.id;
        pageLoad(stateId);
    });

    if(window.location.pathname){
        const path = window.location.pathname.substring(5);
        if(path !== 'home' && path !== 'kontakt'){
            pageLoad('home');
        }else {
            pageLoad(path);
        }
    }else{
        pageLoad('home');
    }
    // email form
    // add event listener for a parent which is already there not for the child
    const formEvent = content.addEventListener('submit', event => {
        event.preventDefault();
        if(event.target.id === 'contact-form' ) {

            let mail = new FormData(form);

            console.log(mail);
            sendMail(mail);
        }

    });

    const sendMail = mail => {
        // Supply the base url with /send for the fetch(). For my example, the base url is where I deploy the app
        fetch('/send', {
            method: 'post',
            body: mail,
        }).then(response => {
            return response.json();
        });
    };

}
