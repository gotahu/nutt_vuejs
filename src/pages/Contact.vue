<template>
  <div class="container">
    <h5 class="mb-3">お問い合わせ・情報修正</h5>
    <div id="contact-form">
      <form class="mb-3">
        <div class="mb-3">
          <label for="inputEmail" class="form-label">メールアドレス(返信が必要な場合)</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="hogehoge@hoge.com" v-model="email">
          <p class="text-danger">{{ errors.email }}</p>
        </div>
        <div class="mb-3">
          <label for="inputTextarea" class="form-label">内容</label>
          <textarea class="form-control" id="inputTextarea" rows="5" v-model="content"></textarea>
          <p class="text-danger">{{ errors.content }}</p>
        </div>
        <button v-if="!valid" :disabled="!valid" class="btn btn-dark" type="button">未入力の送信項目があります</button>
        <button v-else-if="valid" type="button" class="btn btn-primary" @click="submit">送信</button>
      </form>
    </div>
    <div class="fw-bold">{{ result }}</div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data: function() {
    return {
      email: '',
      content: '',
      result: ''

    }
  },
  computed: {
    checkEmail: function() {
      if (this.email) { // なにか入力されていた場合，正規表現にかける
        if (!this.validEmail(this.email)) {
          return 'メールアドレスを正しく入力してください．'
        }
      }
      return ''
    },
    checkContent: function() {
      if (!this.content) {
        return '内容を入力してください．'
      }
      return ''
    },
    errors: function() {
      const errors = {
        'email': this.checkEmail,
        'content': this.checkContent,
      }

      for (const key in errors) {
        if (errors[key] === '' || errors[key] === null || errors[key] === undefined) {
          delete errors[key];
        }
      }

      return errors;
    },
    valid: function() {
      return !Object.keys(this.errors).length;
    }
  },
  methods: {
    validEmail: function(email) {
      const re = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      return re.test(email);
    },
    submit: async function() {
      const result = await this.send();
      this.result = result;

      if (result === "送信成功") {
        this.clear();
      }
    },
    send: async function() {
      const url = 'https://hinyari.net/other/nutt/api/contact.php'
      const params = {
        email: this.email,
        content: this.content
      }

      return await this.axios.post(url, params)
        .then(function(res) {
          return res.data
        })
        .catch(function(err) {
          console.log(err)
        });
    },
    clear: function() {
      this.email = ''
      this.content = ''
    }
  }
}
</script>

<style scoped>

</style>