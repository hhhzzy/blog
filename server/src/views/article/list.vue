<template>
    <div class="article-box">
        <div class="operate-box">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="文章名称：">
                    <el-input v-model="searchForm.name" placeholder="文章名称" />
                </el-form-item>
                <el-form-item label="文章标签：">
                    <el-input v-model="searchForm.tag" placeholder="文章标签" />
                </el-form-item>
                <el-form-item label="文章分类：">
                    <el-select v-model="searchForm.type" clearable placeholder="文章分类">
                        <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="GetList">查询</el-button>
                    <el-button type="primary" @click="gotoDetail('add')">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="name"
                label="文章名称"
            />
            <el-table-column
                prop="summary"
                label="摘要"
            />
            <el-table-column
                label="分类"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.type ? scope.row.type.name : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="tag"
                label="标签"
            >
                <template slot-scope="scope">
                    <el-tag
                        v-for="item in scope.row.tag"
                        :key="item.label"
                        size="mine"
                        style="margin-right:5px;line-height: 26px;"
                    >
                        {{ item }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="createdTime"
                label="创建时间"
            >
                <template slot-scope="scope">
                    {{ scope.row.createdTime | dateFormat }}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" @click="gotoDetail('edit',scope.row.id)">修改</el-button>
                    <el-button type="danger" @click="Del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box">
            <el-pagination
                :current-page="searchForm.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="searchForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="resultData.count"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { findArticle, delArticle, findArticleType } from '@/api/article'
@Component({
    name: 'ArticleList'
})
export default class ArticleList extends Vue {
    private formData:{
        name: string
    } = {
        name: ''
    }
    private searchForm = {
        currentPage: 1,
        pageSize: 10
    }
    private tableData = []
    private resultData = {}
    private typeList: object[] = []

    public async GetList() {
        this.searchForm.currentPage = 1
        this.findArticle()
    }
    public async findArticle() {
        const { data } = await findArticle<any>(this.searchForm)
        if (data.code) {
            this.tableData = data.data.result
            this.resultData = data.data
        }
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
    // 新增 或者修改
    public async gotoDetail(type: string, id: string) {
        if (type === 'add') {
            this.$router.push({
                path: '/article/detail'
            })
        } else {
            this.$router.push({
                path: '/article/detail',
                query: {
                    id: id
                }
            })
        }
    }
    public async Del(row: any) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
            const { data } = await delArticle({ id: row.id })
            if (data.code) {
                this.$message.success('删除成功！')
                this.GetList()
            }
        })
    }

    // 每页显示条数改变触发
    public handleSizeChange(pageSize: number) {
        this.searchForm.pageSize = pageSize
        this.findArticle()
    }
    // 当前页码数改变触发
    public handleCurrentChange(currentPage: number) {
        this.searchForm.currentPage = currentPage
        this.findArticle()
    }
    public async mounted() {
        this.GetList()
        this.getTypeList()
    }
}
</script>
<style lang="less" scoped>
.operate-box{
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px;
    .el-form-item{
        margin-bottom: 0;
    }
}
.pagination-box{
    background-color: #fff;
    padding: 10px;
    margin-top: 10px;
    text-align: right;
}
</style>
