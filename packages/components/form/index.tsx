import { Col, Form, Row } from 'ant-design-vue';
import { defineComponent, Fragment } from 'vue'

import { emits, props } from '~/const/form'
import FormItem from '../formItem';
import styles from './index.module.css'
import { useForm } from './useForm';

export default defineComponent({
  name: 'MForm',
  props,
  emits,
  setup(props, context) {
    const {
      formRef,
      assignOption,
      rules,
      renderFooterBtn,
    } = useForm(props, context)

    return () => {
      return (
        <Fragment>
          <Form
            ref={formRef}
            {...assignOption.otherConfig}
            labelAlign={assignOption.labelAlign}
            rules={rules}
            model={props.modelValue}
            layout={assignOption.layout}
            autocomplete="off"
            wrapperCol={assignOption.wrapperCol}
            labelCol={assignOption.labelCol}
            style={{ marginRight: assignOption.formMarighRight }}
            class={styles['m-form-content']}
          >
            <Row gutter={20}>
              {
                assignOption.column.filter(item => item.display).map((item) => {
                  return (
                    <Col span={item.span}>
                      <FormItem {...item} v-slots={item.slots}>
                      </FormItem>
                    </Col>
                  )
                })
              }
            </Row>
          </Form>
          {
            renderFooterBtn()
          }
        </Fragment>
      )
    };
  },
})
