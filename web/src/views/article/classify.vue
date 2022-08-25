<template>
    <h1>档案</h1>
    <div class="classify-box">
        <ul>
            <li>
                <a href="">Text and Typography</a>
                <span class="dash"></span>
                <span class="time">2022-08-08</span>
            </li>
            <li>
                <a href="">Text and Typography</a>
                <span class="dash"></span>
                <span class="time">2022-08-08</span>
            </li>
            <li>
                <a href="">Text and Typography</a>
                <span class="dash"></span>
                <span class="time">2022-08-08</span>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    h1 {
        font-size: 1.9rem;
        font-weight: 400;
    }
    .classify-box {
        ul {
            margin-top: 3rem;
        }
        li {
            padding: 0.6rem 0;
            line-height: 1.5rem;
            display: flex;
            &::before {
                background: #999;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                display: block;
                content: '';
                position: relative;
                top: 0.6rem;
                margin-right: 0.5rem;
            }
        }
        a {
            font-size: 1rem;
            color: #2a408e;
            &:hover {
                color: #d2603a !important;
                border-bottom: 1px solid #d2603a;
                text-decoration: none;
                margin-bottom: -1px;
            }
        }
        .dash {
            margin: 0 0.5rem 0.6rem 0.5rem;
            border-bottom: 2px dotted #c0c0c0;
            flex-grow: 1;
        }
        .time {
            font-size: 0.8rem;
            color: #6c757d !important;
            font-weight: 400;
        }
    }
</style>
