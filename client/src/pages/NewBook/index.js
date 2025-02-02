import React, {useEffect, useState} from "react";
import {Link,useHistory,useParams} from 'react-router-dom'
import './style.css';
import logo from "../../assets/logo.svg";
import { FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import api from "../../services/api";


export default function NewBook(){

    const [id, setId] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');

    const history = useHistory(); 

    const accessToken = localStorage.getItem('accessToken');

    const {bookId} = useParams();

    const authorization = {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    }
    useEffect(() => {
        if(bookId === '0') return;
        else loadBook();
    },bookId)

    async function loadBook(){
        try {
            const response = await api.get(`api/book/v1/${bookId}`,authorization)

            let adjustedDate = response.data.launchDate.split("T",10)[0];

            setId(response.data.id);   
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setLaunchDate(adjustedDate); 
        } catch (error) {
            alert('Erro recorvering book, try again please!')
            history.push('/books');
        }
    }



    async function saveOrUpdate(e){
        e.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price,
        }

 

        try {
            if(bookId === '0'){
            await api.post('api/Book/v1',data,authorization
            );
            }
            else{
                data.id = id;
                await api.put('api/Book/v1',data,authorization
                );
            }
        } catch (error) {
            alert('Erro while recording book! try again!');
        }
        
        history.push('/books');
      
    }

    return(
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logo} alt="erudio"></img>
                    <h1>{bookId === '0' ? 'Add New' : 'Update'} Book</h1>
                    <p>Enter new book information and click on{bookId === `'0'` ? `'Add'` : 'Update'} 'Add'!</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251fc5"/>
                            Home
                      
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Title" 
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      ></input>

                    <input placeholder="Author" 
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      ></input>

                    <input type="date" 
                      value={launchDate}
                      onChange={e => setLaunchDate(e.target.value)}
                      ></input>

                    <input placeholder="price" 
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      ></input>

                    <button className="button" type="submit">{bookId === '0' ? 'Add' : 'Update'} </button>
                </form>
            </div>
        </div>
    );
}