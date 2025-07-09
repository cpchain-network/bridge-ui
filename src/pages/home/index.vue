<template>
<div class="main-box">
    <div class="main-content">
        <div class="logo-wrapper">
            <img src="@/assets/imgs/home/pic1.png" alt="">
        </div>
        <div class="title-1">
            Dapplink
        </div>
        <div class="desc-1">
            Dapplink is dedicated to building modular, composable Layer 3 solutions aimed at seamlessly interconnecting thousands of chains and enabling comprehensive blockchain integration.
        </div>
        <div class="content-1">
            <div class="left-box">
                <img src="@/assets/imgs/home/pic2.png" alt="">
            </div>
            <div class="right-box">
                <div class="top-wrapper">
                    Import Protocol
                </div>
                <div class="bottom-wrapper">

                    We are committed to progressively introducing protocols to support the development of privacy, social, gaming, custody, and exchange modules within our layer3 blockchain network, ultimately paving the way for the interconnectedness of myriad chains and comprehensive blockchain utilization.
                </div>
            </div>
        </div>
        <div class="content-2">
            <div class="left-box">
                <div class="top-wrapper">
                    Dapplink Bridge
                </div>
                <div class="bottom-wrapper">
                    Dapplink Bridge, the cross-chain interoperability protocol being launched, is positioned to serve as the cornerstone of a comprehensive network. This solution aims to enable the smooth, secure, and efficient transfer of assets and data among various blockchain platforms.
                </div>
            </div>
            <div class="right-box">
                <img src="@/assets/imgs/home/pic3.png" alt="">
            </div>
        </div>
        <div class="follow-wrapper">
            <img src="@/assets/imgs/home/pic4.png" alt="">
            <div class="follow-text">
                Follow us
            </div>
        </div>
        <div class="social-wrapper">
            <div class="social-box">
                <div class="social-item" @click="open('dc')">
                    <img src="@/assets/imgs/home/discord.png" alt="">
                    <span>Discord</span>
                </div>
                <div class="social-item" @click="open('twitter')">
                    <img src="@/assets/imgs/home/twitter.png" alt="">
                    <span>Twitter</span>
                </div>
            </div>
            <div class="social-box">
                <div class="social-item" @click="open('tg')">
                    <img src="@/assets/imgs/home/telegram.png" alt="">
                    <span>Telegram</span>
                </div>
                <div class="social-item" @click="open('github')">
                    <img src="@/assets/imgs/home/github.png" alt="">
                    <span>Github</span>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    // 存放方法事件 - 会在数据变化时被调用
    methods: {
        open(type) {
            if (type === 'twitter') {
                window.open("https://twitter.com/0xdapplink", '_blank')
            } else if (type === 'dc') {
                window.open("https://discord.gg/EpWbAKP8tj", '_blank')
            } else if (type === 'tg') {
                window.open("https://t.me/+qqhy1i-_xnU1M2Jl", '_blank')
            } else {
                window.open("https://github.com/eniac-x-labs", '_blank')
            }
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.main-box {
    width: 100%;
    min-height: 100%;
    min-width: 375px;
    box-sizing: border-box;
    // background: #0c122d;
    // background-image: url("@/assets/imgs/home/bg@2x.svg");
    /* 设置背景图片为一张大小*/
    background-color: #000A2F;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .main-content {
        margin-top: 80px;
        height: 100%;
        // margin: 0 20px;
        // padding-top: 24px;
        // height: 1000px;
        // padding: 0 360px;
        width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;

        // justify-content: center;
        .logo-wrapper {

            img {
                width: 200px;
                height: 200px;
            }
        }

        .title-1 {
            font-size: 48px;
            font-family: Arial, Arial;
            font-weight: 900;
            color: #FFFFFF;
        }

        .desc-1 {
            font-size: 20px;
            font-family: ArialMT;
            color: #FFFFFF;
            margin-top: 21px;
        }

        .content-1 {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;

            .left-box {
                img {
                    width: 561px;
                    height: 320px;
                }
            }

            .right-box {
                margin-left: 38px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .top-wrapper {
                    font-size: 48px;
                    font-family: Arial, Arial;
                    font-weight: 900;
                    color: #FFFFFF;
                }

                .bottom-wrapper {
                    font-size: 20px;
                    font-family: ArialMT;
                    color: #FFFFFF;
                }
            }
        }

        .content-2 {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;

            .left-box {

                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .top-wrapper {
                    font-size: 48px;
                    font-family: Arial, Arial;
                    font-weight: 900;
                    color: #FFFFFF;
                    line-height: 68px;
                }

                .bottom-wrapper {
                    font-size: 20px;
                    font-family: ArialMT;
                    color: #FFFFFF;
                    
                }
            }

            .right-box {
                margin-left: 38px;

                img {
                    width: 561px;
                    height: 320px;
                }
            }
        }

        .follow-wrapper {
            margin: 40px 0;
            position: relative;

            img {
                width: 100%;
            }

            .follow-text {
                font-size: 48px;
                font-family: Arial, Arial;
                font-weight: 900;
                color: #FFFFFF;
                line-height: 68px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .social-wrapper {
            margin: 50px 0;
            display: flex;
            justify-content: space-around;

            .social-box {
                display: flex;
                justify-content: center;

                .social-item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    img {
                        width: 32px;
                        height: 32px;
                    }

                    span {
                        font-size: 24px;
                        font-family: Arial, Arial;
                        font-weight: normal;
                        color: #FFFFFF;
                        
                        margin-left: 10px;
                    }

                    // &:not(:nth-child(4)) {
                    //     margin-right: 100px;
                    // }
                    &:not(:nth-child(4)) {
                        margin-right: 100px;
                    }

                }
            }
        }
    }

    @media only screen and (max-width: 1200px) {
        .main-content {
            width: 800px;
            padding: 0 20px;

            .logo-wrapper {

                img {
                    width: 100px;
                    height: 100px;
                }
            }

            .title-1 {
                font-size: 36px;
            }

            .desc-1 {
                font-size: 16px;
            }

            .content-1 {
                flex-direction: column;
                align-items: center;

                .left-box {
                    img {
                        width: 300px;
                        height: 160px;
                    }
                }

                .right-box {
                    margin-left: 0;
                    display: flex;
                    flex-direction: column;
                    // justify-content: space-around;
                    align-items: center;

                    .top-wrapper {
                        font-size: 32px;
                    }

                    .bottom-wrapper {
                        font-size: 14px;
                        font-family: ArialMT;
                        color: #FFFFFF;
                    }
                }
            }

            .content-2 {
                flex-direction: column;
                align-items: center;

                .left-box {
                    display: flex;
                    flex-direction: column;
                    // justify-content: space-around;
                    align-items: center;

                    .top-wrapper {
                        font-size: 32px;
                        font-family: Arial, Arial;
                        font-weight: 900;
                        color: #FFFFFF;
                        line-height: 68px;
                    }

                    .bottom-wrapper {
                        font-size: 14px;
                        font-family: ArialMT;
                        color: #FFFFFF;
                        
                    }
                }

                .right-box {
                    margin-left: 38px;

                    img {
                        margin-top: 20px;
                        width: 300px;
                        height: 160px;
                    }
                }
            }

            .follow-wrapper {
                .follow-text {
                    font-size: 28px;
                }
            }

            .social-wrapper {
                .social-box {
                    display: flex;
                    justify-content: center;

                    .social-item {
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        img {
                            width: 24px;
                            height: 24px;
                        }

                        span {
                            font-size: 18px;
                        }

                        &:not(:nth-child(4)) {
                            margin-right: 60px;
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 800px) {
        .main-content {
            width: 100%;
            // max-width: 600px;
            margin: 80px 20px 0 20px;

            .logo-wrapper {

                img {
                    width: 60px;
                    height: 60px;
                }
            }

            .title-1 {
                font-size: 34px;
            }

            .social-wrapper {
                margin-top: 20px;

                .social-box {
                    flex-direction: column;
                    justify-content: center;

                    .social-item {
                        img {
                            width: 20px;
                            height: 20px;
                        }

                        span {
                            font-size: 16px;
                        }

                        &:not(:nth-child(4)) {
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>
