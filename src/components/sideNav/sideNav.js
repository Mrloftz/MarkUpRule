import React from 'react'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'


const { Content, Sider } = Layout;

class SideNav extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={this.props.onChangeTable}>
            <Menu.Item key="fare">
              <Link to="/FarePage">
                <Icon type="pie-chart" />
                <span>Fare</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="criteria">
              <Link to="/CriteriaPage">
                <Icon type="desktop" />
                <span>Criteria</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="markuprule">
              <Link to="/MarkupRulePage">
                <Icon type="desktop" />
                <span>Mark up Rule</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="booking">
              <Link to="/BookingPage">
                <Icon type="desktop" />
                <span>Booking</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px', marginTop: '1rem' }}>
            <div>{this.props.children}</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SideNav