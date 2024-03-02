import React from "react";
import Navigation from './NavigationBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from "./Footer";

function FilterBar() {
    return (
        <div className="filterBar">
            <h2>Filter</h2>
            <ul className="filterBar-options">
                <li>
                    <button type='button' className="filterBar-option-button">
                        Support Groups
                        <img src="/img/plus-icon.png" alt="plus icon"/>
                    </button>
                </li>
                <li>
                    <button type='button' className="filterBar-option-button">
                        Therapy
                        <img src="/img/plus-icon.png" alt="plus icon"/>
                    </button>
                </li>
                <li>
                    <button type='button' className="filterBar-option-button">
                        Housing
                        <img src="/img/plus-icon.png" alt="plus icon"/>
                    </button>
                </li>
                <li>
                    <button type='button' className="filterBar-option-button">
                        Employment
                        <img src="/img/plus-icon.png" alt="plus icon"/>
                    </button>
                </li>
                <li>
                    <button type='button' className="filterBar-option-button last-button">
                        Clubs
                        <img src="/img/plus-icon.png" alt="plus icon"/>
                    </button>
                </li>
            </ul>
        </div>
    );
};

function Resources(props) {
    const resourceData = props.resourceData;
    const resourceCards = resourceData.map((resource) => {
        const tags = resource.tags.map((tag) => {
            return (
                <li key={tag} className={`${resource.tag} resource-card-tag`}>{tag}</li>
            )
        })
        return (
            <div key={resource.name} className="resource-card-container">
                <h3 className="resource-card-name">{resource.name}</h3>
                <img className="resource-card-img" src={resource.image} alt={resource.alt} />
                <ul>
                    {tags}
                </ul>
                <p>{resource.description}</p>
                <a href={resource.link} target="_blank">GO TO RESOURCE</a>
            </div>
        )
    });
    return (
        <div className="resourcePage-content-container">
            <FilterBar />
            <div className="resources">
                <h2>{props.resourceType}</h2>
                {resourceCards}
                {/* {props.resourceType} */}
            </div>
        </div>
    )
}

export default function ResourcePage(props) {
    return (
        <div className="resourcePage">
            <Navigation pageTitle={'Resources'} />
            <div className="resourcePage-body">
                <Tabs
                    defaultActiveKey='UW Resources'
                    className="resource-type-tabs"
                >
                    <Tab 
                        eventKey="UW Resources" 
                        title="UW Resources"
                        className="resource-option-tab"
                    >
                        <Resources resourceType={"UW Resources"} resourceData={props.uwResources} />
                    </Tab>
                    <Tab 
                        eventKey="Seattle Resources" 
                        title="Seattle Resources"
                        className="resource-option-tab"
                    >
                        <Resources resourceType={"Seattle Resources"} resourceData={props.seattleResources} />
                    </Tab>
                    <Tab 
                        eventKey="Online Resources" 
                        title="Online Resources"
                        className="resource-option-tab"
                    >
                        <Resources resourceType={"Online Resources"} resourceData={props.onlineResources} />
                    </Tab>
                </Tabs>
            </div>
            <Footer />
        </div>
    )
}