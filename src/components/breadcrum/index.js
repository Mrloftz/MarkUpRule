import React from 'react'
import { Breadcrumb } from 'antd'
export const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/fare">Create Fare</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
