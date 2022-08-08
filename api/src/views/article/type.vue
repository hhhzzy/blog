<template>
    <div class="type-box">
        <div class="operate-box">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="字典名称：">
                    <el-input v-model="searchForm.name" placeholder="字典名称" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="GetList">查询</el-button>
                    <el-button type="primary" @click="ShowDialog">新增</el-button>
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
                label="字典名称"
                width="180"
            />
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
                    <el-button type="primary" @click="Update(scope.row)">修改</el-button>
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
        <el-dialog
            title="新增或修改"
            :visible.sync="formVisible"
            :close-on-click-modal="false"
            width="30%"
        >
            <el-form>
                <el-form-item label="分类名称：" label-width="120">
                    <el-input v-model="formData.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddOrUpdateArticleType">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { addArticleType, findArticleType, delArticleType, updateArticleType } from '@/api/article'
@Component({
    name: 'ArticleType'
})
export default class ArticleType extends Vue {
    private formVisible: boolean = false
    private formData:{
        name: string
    } = {
        name: ''
    }
    private searchForm = {
        currentPage: 1,
        pageSize: 10
    }
    private tableData: object[] = []
    private resultData = {}
    private type = 'add'

    public async ShowDialog() {
        this.formVisible = true
        this.formData.name = ''
        this.type = 'add'
    }
    // 新增 或 修改
    public async AddOrUpdateArticleType() {
        if (this.type === 'add') {
            const { data } = await addArticleType(this.formData)
            if (data.code) {
                this.$message.success('新增成功！')
                this.formVisible = false
                this.GetList()
            }
        } else {
            const { data } = await updateArticleType(this.formData)
            if (data.code) {
                this.$message.success('修改成功！')
                this.formVisible = false
                this.GetList()
            }
        }
    }
    // 删除
    public async Del(val: {id: string}) {
        console.log(val)
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
            const { data } = await delArticleType({ id: val.id })
            if (data.code) {
                this.$message.success('删除成功！')
                this.GetList()
            }
            console.log(data)
        })
    }
    // 修改
    public async Update(val: {name: string}) {
        this.formVisible = true
        this.formData = Object.assign({}, val)
        this.type = 'edit'
    }
    public GetList() {
        this.searchForm.currentPage = 1
        this.Search()
    }
    public async Search() {
        const { data } = await findArticleType<any>(this.searchForm)
        if (data.code) {
            this.tableData = data.data.result
            this.resultData = data.data
        }
    }
    // 每页显示条数改变触发
    public handleSizeChange(pageSize: number) {
        this.searchForm.pageSize = pageSize
        this.Search()
    }
    // 当前页码数改变触发
    public handleCurrentChange(currentPage: number) {
        this.searchForm.currentPage = currentPage
        this.Search()
    }
    public async mounted() {
        this.Search()
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
