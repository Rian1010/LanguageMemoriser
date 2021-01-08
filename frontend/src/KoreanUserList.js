import React, { useState, useEffect } from 'react';
import './App.css';


function KoreanUserList() {
    const [vocabList, setVocabList] = useState([]);
    const [activeVocab, setActiveVocab] = useState({
        id: null,
        word: '',
        definition: '',
    });
    const [editingMode, setEditingMode] = useState(false);

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function fetchWords() {
        // console.log("fetching...");
        fetch('http://127.0.0.1:8000/api/user-word-list/', {
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => setVocabList(data));
    }

    useEffect(() => {
        fetchWords();
    }, [vocabList]);

    function handleChange(e) {
        const { name, value } = e.target;
        setActiveVocab(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("ITEM", activeVocab)

        let csrftoken = getCookie('csrftoken');

        let url = "http://127.0.0.1:8000/api/user-word-create/";

        if(editingMode) {
            url = `http://127.0.0.1:8000/api/user-word-update/${ activeVocab.id }/`
            setEditingMode(false);
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(activeVocab)
        }).then(response => {
            fetchWords();
            setActiveVocab({
                id: null, 
                word: "", 
                definition: ""
            });
        }).catch(err => {
            console.log("ERROR", err)
        });
    }

    function handleEditingMode(vocab) {
        setActiveVocab(vocab);
        setEditingMode(true)
    }

    function deleteVocab(vocab) {
        let csrftoken = getCookie("csrftoken");

        fetch(`http://127.0.0.1:8000/api/user-word-delete/${vocab.id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
            }
        }).then(response => fetchWords());
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col text-center">
                <h1>Korean Vocabulary List</h1>
                </div>
            </div>
            <form className="my-5 py-3 ps-5 border" onSubmit={handleSubmit} style={{backgroundColor: 'skyblue'}}>
                <div className="list-container row d-flex justify-content-center">
                    <div className="col-5">
                        <input 
                            onChange={handleChange}
                            value={activeVocab.word} 
                            id="word" 
                            className="form-control" 
                            name="word"
                            type="text" 
                            placeholder="Enter a word" 
                            required     
                        />
                    </div>
                    <div className="col-5">
                        <input 
                            onChange={handleChange}
                            value={activeVocab.definition} 
                            id="definition" 
                            className="form-control" 
                            name="definition"
                            type="text" 
                            placeholder="Enter the definition" 
                            required     
                        />
                    </div>
                    <div className="col-2">
                        <input className="btn btn-warning" id="submit" type="submit" name="Add New Word" value={editingMode ? "Update" : "Add New Vocabulary"} />
                    </div>  
                </div>
            </form>
            {vocabList.map((vocab, index) => {
                return(
                    <div className="row py-3 border">
                        <div className="col-5">
                            <div key={index} className="text-center">
                                <span>{ vocab.word }</span>
                            </div>
                        </div>
                        <div className="col-5">
                            <div key={index} className="text-center">
                                <span>{vocab.definition}</span>
                            </div>
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary" onClick={() => handleEditingMode(vocab)} type="submit"><i className="fa fa-edit"></i></button>
                        </div> 
                        <div className="col-1">
                            <button className="btn btn-danger" onClick={() => deleteVocab(vocab)}><i className="fa fa-trash"></i></button>
                        </div> 
                    </div>
                )
            })}
        </div>
    )
}

export default KoreanUserList
