import styled from "@emotion/styled";


const Boton = styled.p`
    display:block;
    font-weight : 700;
    text-transform: uppercase;
    padding : .8rem 2rem;
    margin-right: 1rem;
    text-align:center;
    border:1px solid #d1d1d1;
   

    background-color: ${props => props.bgColor? '#DA552F' : 'white'};
    color: ${props => props.bgColor? 'white' : '#000'}; 

    &:hover {  
        cursor: pointer;
      }

      &.disabled {
       color: gray;
      }

      &.disabled:hover {
      cursor:not-allowed;
      }
  
`

export default Boton;