<template>
  <div class="editorBox">
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script type="text/ecmascript-6">
  import httpUrl from '@/libs/http';

  export default {
    name: 'UE',
    props: {
      id: {
        type: String
      },
      contentText: {
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
      this.editor.addListener('ready', function () { // 确保UE加载完成后放入内容
        if (self.contentText) {
          self.editor.setContent(self.contentText);
        } else {
          self.editor.setContent('');
        }
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent();
      }
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
