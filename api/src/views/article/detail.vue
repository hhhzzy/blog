<template>
    <div class="article-box">
        <el-form ref="form" :model="formData" label-width="80px" label-position="top">
            <el-form-item label="文章名称">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="文章摘要">
                <el-input v-model="formData.summary" type="textarea" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formData.type" placeholder="请选择">
                    <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="formData.tag">
                    <el-checkbox v-for="(item,index) in tagArr" :key="index" :label="item.name" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="阅读时间">
                <el-input v-model="formData.readtime" type="text" />
            </el-form-item>
            <el-form-item label="文章内容">
                <mavon-editor
                    ref="md"
                    v-model="formData.content"
                    @imgAdd="imgAdd"
                    @imgDel="imgDel"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="CreateOrUpdateArticle">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { addArticle, getInfo, updateArticle, findArticleType } from '@/api/article'

import { findTag } from '@/api/tag'
import { upload } from '@/api/upload'
import url from '@/utils/url'
@Component({
    name: 'ArticleDetail'
})

export default class ArticleDetail extends Vue {
    private formData = {
        tag: []
    }
    private tagArr = []
    private url = url
    private id = ''
    private typeList: object[] = []

    public async GetAllTag() {
        const { data } = await findTag<any>({ pageSize: 100, currentPage: 1 })
        if (data.code) {
            this.tagArr = data.data.result
        }
        console.log(data)
    }
    private async CreateOrUpdateArticle() {
        if (this.id) {
            const { data } = await updateArticle(this.formData)
            if (data.code) {
                this.$message.success('修改成功！')
            }
        } else {
            const { data } = await addArticle(this.formData)
            if (data.code) {
                this.$message.success('新增成功！')
                this.$router.push({
                    path: '/article/list'
                })
            }
        }
    }

    // 查询详情
    public async getInfo() {
        const { data } = await getInfo<any>({ id: this.id })
        if (data.code) {
            this.formData = Object.assign({}, data.data)
        }
        console.log(data, 111)
    }

    // 编辑器图片上传
    public async imgAdd(pos: any, file:any) {
        console.log(pos, file)
        const param = new FormData() // 创建form对象
        param.append('file', file) // 通过append向form对象添加数据
        const { data } = await upload<any>(param)
        if (data.code) {
            (this.$refs['md'] as any).$img2Url(pos, url + data.data.url)
        }
        console.log(data)
    }
    public imgDel(pos: any, file:any) {
        console.log(pos)
    }
    public async getTypeList() {
        const { data } = await findArticleType({
            currentPage: 1,
            pageSize: 100
        })
        if (data.code) {
            this.typeList = data.data.result
        }
        console.log(data)
    }
    public mounted() {
        this.GetAllTag()
        this.getTypeList()
        this.id = this.$route.query.id as string
        if (this.$route.query.id) {
            this.getInfo()
        }
    }
}
</script>
<style lang="less" scoped>
.article-box{
    padding: 10px;
    background-color: #fff;
}
.el-select{
    width: 100%;
}
</style>
