import React from "react";
import classnames from "classnames";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane
} from "reactstrap";
import Books from "views/books/Books";
import Customer from "views/customer/Customer";
import Loans from "views/Loans/Loans";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            iconTabs: 1
        };
    }
    toggleTabs = (e, stateName, index) => {
        
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };
    render() {
        return (
            
            <Card className="card-nav-tabs">
                <CardHeader className="card-header-primary">
                    {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                    <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                            <Nav data-tabs="tabs" tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.iconTabs === 1
                                        })}
                                        onClick={e => this.toggleTabs(e, "iconTabs", 1)}
                                        href="#pablo"
                                    >
                                        <i className="tim-icons icon-book-bookmark" />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.iconTabs === 2
                                        })}
                                        onClick={e => this.toggleTabs(e, "iconTabs", 2)}
                                        href="#pablo"
                                    >
                                        <i className="tim-icons icon-badge" />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.iconTabs === 3
                                        })}
                                        onClick={e => this.toggleTabs(e, "iconTabs", 3)}
                                        href="#pablo"
                                    >
                                        <i className="tim-icons icon-single-copy-04" />
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <TabContent className="text-center" activeTab={"iconTabs" + this.state.iconTabs}>
                        <TabPane tabId="iconTabs1">
                            <Books></Books>
                        </TabPane>
                        <TabPane tabId="iconTabs2">
                            <Customer></Customer>
                        </TabPane>
                        <TabPane tabId="iconTabs3">
                            <Loans></Loans>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        );
    }
}

export default Home;