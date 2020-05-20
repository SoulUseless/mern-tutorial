import React, { useState } from 'react';

import Card from "../../shared/components/UIElements/Card.js";
import Modal from "../../shared/components/UIElements/Modal.js";
import Button from "../../shared/components/FormElements/Button.js";
import './PlaceItem.css';

function PlaceItem(props) {
    const [showMap, setShowMap] = useState(false);

    function openMapHandler() {
        setShowMap(true);
    }

    function hideMapHandler() {
        setShowMap(false);
    }
     
    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={hideMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={hideMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <h2> THEMAP </h2>
                </div>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.imageUrl} alt={props.title} />
                    </div>

                    <div className="place-item__info">
                        <h2> {props.title} </h2>
                        <h3> {props.address} </h3>
                        <p> {props.description} </p>
                    </div>

                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}> VIEW ON MAP </Button>
                        <Button to={`/places/${props.id}`}> EDIT </Button>
                        <Button danger> DELETE </Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;