import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

  *{
    margin:0;
    padding:0;
  }

ul{
    list-style: none;
}

a {
    text-decoration:none;
    color: inherit;
}

a:hover {
    cursor: pointer;
    color: $muted-wine;
}

body {
    font-family: $lato-font;
    background-color: $main-cream;
    color: $main-dark;

}

img {
    object-fit:cover;
    width:100%;
    height:100%;
}

input{
    font-family: inherit;
}
button {
    font-family: inherit;
}

.mainHighlight{
    color:$main-wine;
}
button{
    border:none;
    outline:none;
}
`;
