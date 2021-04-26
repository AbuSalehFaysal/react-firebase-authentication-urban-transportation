import React from 'react';
import Transportation from '../Transportation/Transportation';

const Home = () => {
    const transportations = [
        {
            title: 'Bike',
            description: 'Motor-powered, single-track vehicle',
            imgUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YmlrZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            capacity: 2,
            transportationType: 'Bike',
            avatar: 'B',
            price: '50/km'
        },
        {
            title: 'Car',
            description: 'A four-wheeled road vehicle that is powered by an engine and is able to carry a small number of people',
            imgUrl: 'https://www.amlu.com/wp-content/uploads/2017/06/bmw-changes-the-definition-of-coupe-with-its-latest-the-6-series-gt21.jpg',
            
            capacity: 4,
            transportationType: 'Car',
            avatar: 'C',
            price: '100/km'
        },
        {
            title: 'Bus',
            description: 'A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare.',
            imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg/1200px-LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg',
            
            capacity: 50,
            transportationType: 'Bus',
            avatar: 'B',
            price: '25/km'
        },
        {
            title: 'Train',
            description: 'A number of vehicles or pack animals moving in a line',
            imgUrl: 'https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2020/05/04/train.jpg?itok=5L0gck6I',
            
            capacity: 1000,
            transportationType: 'Train',
            avatar: 'T',
            price: '15/km'
        }
    ]
    return (
        <div className="text-center">
            <h1>Urban Transportation</h1>
            <h2>Transportation Solution for all people</h2>
            {
                transportations.map(transportation => <Transportation key={transportation.transportationType} transportation={transportation}></Transportation>)
            }
        </div>
    );
};

export default Home;