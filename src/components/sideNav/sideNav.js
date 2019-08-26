import React from 'react'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Icon } from 'antd';


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
                  <Icon type="pie-chart" />
                  <span>Fare</span>
                </Menu.Item>
                <Menu.Item key="criteria">
                  <Icon type="desktop" />
                  <span>Criteria</span>
                </Menu.Item>
                <Menu.Item key="markuprule">
                  <Icon type="desktop" />
                  <span>Mark up Rule</span>
                </Menu.Item>
                <Menu.Item key="booking">
                  <Icon type="desktop" />
                  <span>Booking</span>
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