<template>
  <div class="box">
    <div class="login">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="login-dev"
      >
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>

        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="验证码" prop="code" label-width="80px">
          <el-input style="width: 200px" v-model="ruleForm.code" />
          <img class="img" :src="imgtoken.list.captchaImg" alt="" />
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button>获取密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { login, captcha } from '../api/user'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const ruleFormRef = ref()

const ruleForm = reactive({
  username: 'test',
  password: '1234567',
  code: '',
  token: store.state.list.token
})
const imgtoken = reactive({
  list: store.state.list
})

// 效验
const rules = {
  username: [
    {
      required: true,
      message: '请正确账号',
      trigger: 'blur'
    },
    { min: 1, max: 5, message: '字 符 在 1 到 5 以 内', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请正确输入密码',
      trigger: 'blur'
    },
    { min: 3, max: 7, message: '字 符 在 3 到 7 以 内', trigger: 'blur' }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
// 登陆点击事件
const submitForm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      login(ruleForm).then((res) => {
        localStorage.setItem('token', res.headers.authorization)
        if (res.data.code === 200) {
          router.push('/index')
        }
      })
    } else {
      console.log('验证码不正确')
    }
  })
}

captcha().then((res) => {
  const { data } = res.data
  store.commit('token', data)
})
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(169, 243, 172);
}
.login {
  width: 480px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  padding-left: 20px;
}
</style>
