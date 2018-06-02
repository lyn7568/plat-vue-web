<template>
  <div class="editorBox">
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script type="text/ecmascript-6">
  // import '../../../../static/ueditor/ueditor.config.js';
  // import '../../../../static/ueditor/ueditor.all.js';
  // import '../../../../static/ueditor/lang/zh-cn/zh-cn.js';
  // import '../../../../static/ueditor/ueditor.parse.js';
  import httpUrl from '@/libs/http';

  export default {
    name: 'UE',
    props: {
      id: {
        type: String
      },
      text: {
        type: String
      }
    },
    data () {
      return {
        editor: null
      };
    },
    mounted() {
      const self = this;
      /* eslint-disable no-undef */
      this.editor = UE.getEditor(this.id, {
        initialFrameWidth: null,
        initialFrameHeight: 500,
        serverUrl: httpUrl.kxQurey.editor,
        UEDITOR_HOME_URL: '/static/ueditor/' // 这个是静态资源的路径
      }); // 初始化UE
      this.editor.addListener('ready', function () {
        self.editor.setContent(''); // 确保UE加载完成后放入内容
      });
      console.log(this.text);
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent();
      },
      setUEContent(uhtml) { // 获取内容方法
        var self = this;
        this.editor.addListener('ready', function () {
          self.editor.setContent(uhtml); // 确保UE加载完成后放入内容
        });
      },
      testMsg() {
        const self = this;
        this.defaultMsg = this.text;
        console.log(this.defaultMsg);
        this.editor.setContent(self.defaultMsg); // 确保UE加载完成后放入内容
      }
    },
    watch: {
      'text': 'testMsg'
    },
    destroyed() {
      this.editor.destroy();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.editorBox
  line-height:18px
</style>
