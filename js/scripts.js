// caminho da minha url, quando for usar o json-server na atividade o endpointe dele sera este caminho;
const url = "https://jsonplaceholder.typicode.com/posts" ;

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

// Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentContainer = document.querySelector("#comment-form");

// Get all posts 

async function getAllPosts(){
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    console.log(data);

    loadingElement.classList.add("hide");

    data.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div);

    });

};

// Get individual Post

async function getPost(id){
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
    ])

    const  dataPost = await responsePost.json();
    const dataComments = await responseComments.json();
    
    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dataPost.title;
    body.innerText = dataPost.body;

    console.log(dataComments);

    postContainer.append(title);
    postContainer.append(body);

    dataComments.map((comment) => {
        creatComment(comment);
    });


}

function creatComment(comment) {
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");

    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    div.append(email);
    div.append(commentBody);

    commentContainer.appendChild(div);
}




if(!postId){
    getAllPosts();
} else {
    getPost(postId);
}
