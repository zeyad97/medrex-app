import React, {useEffect, useState} from "react";


export default function CoronaContent(props) {

    async function fetchData(){
        try {

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("GET", "https://thevirustracker.com/free-api?global=stats");

            xhr.send();
        }catch (error) {
            console.log(error)
            }
        }

    useEffect( () => {
        fetchData();
    }, []);

    return (
        <div>
            <p>Yo</p>
        </div>
    );
}


