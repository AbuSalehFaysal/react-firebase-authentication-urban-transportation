import React from 'react';
import { Link, useParams } from 'react-router-dom';


const Book = () => {
    const { transportationType } = useParams();
    return (
        <div className="text-center">
            <h1>Choose Your Destination</h1>
            <form action="">
                <label for="from">PICK FROM :</label>

                <select name="from" id="from">
                    <option value="volvo">Uttara</option>
                    <option value="saab">Banani</option>
                    <option value="mercedes">Gulshan</option>
                    <option value="audi">Dhanmondi</option>
                </select>

                <br />

                <label for="from">PICK To :</label>

                <select name="from" id="from">
                    <option value="audi">Dhanmondi</option>
                    <option value="volvo">Uttara</option>
                    <option value="saab">Banani</option>
                    <option value="mercedes">Gulshan</option>
                </select>
                <br/>
                
                <a className="btn btn-primary" href="/search" >Search for {transportationType}</a>
                
            </form>
            
        </div>
    );
};

export default Book;