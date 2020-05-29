import React, { useState, useContext } from 'react';

import Card from "../../shared/components/UIElements/Card.js";
import Modal from "../../shared/components/UIElements/Modal.js";
import Button from "../../shared/components/FormElements/Button.js";
import Map from "../../shared/components/UIElements/Map.js"; 
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import './PlaceItem.css';

function PlaceItem(props) {
    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { isLoading, error, sendRequest, errorHandler } = useHttpClient();

    function openMapHandler() {
        setShowMap(true);
    }

    function hideMapHandler() {
        setShowMap(false);
    }
     
    function showDeleteWarningHandler() {
        setShowConfirmModal(true);
    }

    function closeDeleteWarningHandler() {
        setShowConfirmModal(false);
    }

    async function confirmDeleteHandler() {
        setShowConfirmModal(false);
        //console.log("DELETED");
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                "DELETE"
            );
            props.onDelete(props.id); //run function parsed in from outside
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />

            <Modal
                show={showMap}
                onCancel={hideMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={hideMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>

            <Modal
                show={showConfirmModal}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={closeDeleteWarningHandler}>
                            Cancel{" "}
                        </Button>

                        <Button danger onClick={confirmDeleteHandler}>
                            Delete{" "}
                        </Button>
                    </React.Fragment>
                }
            >
                <p className="center">Do you want to proceed and delete?</p>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && (
                        <div className="center">
                            <LoadingSpinner asOverlay/>
                            {/*render a loading spinner*/}
                        </div>
                    )}
                    <div className="place-item__image">
                        <img src={props.imageUrl} alt={props.title} />
                    </div>

                    <div className="place-item__info">
                        <h2> {props.title} </h2>
                        <h3> {props.address} </h3>
                        <p> {props.description} </p>
                    </div>

                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>
                            VIEW ON MAP
                        </Button>

                        {auth.userId === props.creatorId && (
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                        )}

                        {auth.userId === props.creatorId && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;