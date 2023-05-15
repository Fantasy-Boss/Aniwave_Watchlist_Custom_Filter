// ==UserScript==
// @name           9anime Watch-List Custom Filter
// @namespace      https://greasyfork.org/en/users/957626-fantasy-boss
// @homepageURL    https://github.com/Fantasy-Boss/9anime-Watch-List-Custom-Filter
// @supportURL     https://github.com/Fantasy-Boss/9anime-Watch-List-Custom-Filter/issues/new
// @version        1.0.2
// @description    Watch-List Custom Filter for 9anime
// @author         Fantasy Boss
// @icon           https://www.google.com/s2/favicons?domain=9anime.id
// @match          *://9anime.to/user/watch-list*
// @match          *://9anime.id/user/watch-list*
// @match          *://9anime.gs/user/watch-list*
// @match          *://9anime.pl/user/watch-list*
// @grant          GM_addStyle
// @require        https://code.jquery.com/jquery-3.6.1.min.js
// @compatible     chrome
// @compatible     firefox
// @run-at         document-end
// @license        MIT
// ==/UserScript==


(function() {
    'use strict';

    window.addEventListener('load', async() => {
        // Add The Custom HTML and Style
        GM_addStyle(`#custom-filter {
            background: #212121;
            margin-bottom: 20px;
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
            flex-wrap: wrap;
        } #custom-filter button > span {
            pointer-events:none
        } .cf-active, .cf-active:hover, .cf-active:focus, .cf-active:active {
            background-color: #3d1576;
            color: #fff;
        } #img_view {
            position: fixed;
            background: #000000cc;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #img_view img {
            height: 100%;
        }
        `)
        let html = `
        <div id="custom-filter" class="d-flex align-items-center">
          <span class="h5 ml-1 mr-4 mb-0">Custom Filter:</span>
          <button class="btn btn-bg btn-primary d-flex align-items-center mr-3" id="com-sub">
            <span>Completed (Sub)</span>
          </button>
          <button class="btn btn-bg btn-primary d-flex align-items-center mr-3" id="com-dub">
            <span>Completed (Dub)</span>
          </button>
          <button class="btn btn-bg btn-primary d-flex align-items-center mr-3" id="air-sub">
            <span>Releasing (Sub)</span>
          </button>
          <button class="btn btn-bg btn-primary d-flex align-items-center mr-3" id="air-dub">
            <span>Releasing (Dub)</span>
          </button>
          <button class="btn btn-bg btn-primary d-flex align-items-center mr-3" id="reset">
            <span>Reset Filter</span>
          </button>
          <button class="btn btn-bg btn-light d-flex align-items-center mr-3 ml-auto" id="count">
            <span style="color: black !important; font-weight: bolder;">0</span>
          </button>
        </div>
        `
        $('#body > div.profile-container > div > aside.main > div.watchlist.scaff.items').before(html)
        setInterval(()=> {
            $("#custom-filter #count span").text($(".watchlist.items .item:visible").length)
        }, 100)
        $(".watchlist.items .poster img").click((e)=> {
            let src = ($(e.target).attr("src")).replace("-w100", "")
            let img_view = `<div id="img_view"><img src="${src}"></div>`
            $('body').after(img_view)
            $("#img_view").click(()=> {
                $("#img_view").remove()
            })
        })

        // Clicked Functions
        const reset = async()=> {
            $('#custom-filter button').removeClass('cf-active')
            $('#body > div.profile-container > div > aside.main > div.watchlist.scaff.items .item').removeClass('d-none')
        }
        const comSub = async()=> {
            let arr = $('#body > div.profile-container > div > aside.main > div.watchlist.scaff.items .item')
            arr.map((i)=> {
                let ep_count = 0
                let com_count = 0
                let span_arr = $(arr[i]).find(`.info .detail .ep span`)
                if ($(span_arr).length > 1) {
                    span_arr.map((o)=> {
                        if (($(span_arr[o]).text()).includes('EPS')) {
                            ep_count = parseInt($(span_arr[o]).text())
                        }
                        if ($(span_arr[o]).find(`i`).attr('class') === 'fa-solid fa-closed-captioning') {
                            com_count = parseInt($(span_arr[o]).text())
                        }
                    })
                }
                else {
                    if (($(span_arr).text()).includes('EPS')) {
                        ep_count = parseInt($(span_arr).text())
                    } else {
                        ep_count = 9999999999999999999999
                        if ($(span_arr).find(`i`).attr('class') === 'fa-solid fa-closed-captioning') {
                            com_count = parseInt($(span_arr).text())
                        }
                    }
                }
                if (ep_count !== com_count) $(arr[i]).addClass('d-none')
            })
        }
        const comDub = async()=> {
            let arr = $('#body > div.profile-container > div > aside.main > div.watchlist.scaff.items .item')
            arr.map((i)=> {
                let ep_count = 0
                let com_count = 0
                let span_arr = $(arr[i]).find(`.info .detail .ep span`)
                if ($(span_arr).length > 1) {
                    span_arr.map((o)=> {
                        if (($(span_arr[o]).text()).includes('EPS')) {
                            ep_count = parseInt($(span_arr[o]).text())
                        }
                        if ($(span_arr[o]).find(`i`).attr('class') === 'fa-solid fa-microphone') {
                            com_count = parseInt($(span_arr[o]).text())
                        }
                    })
                }
                else {
                    if (($(span_arr).text()).includes('EPS')) {
                        ep_count = parseInt($(span_arr).text())
                    } else {
                        ep_count = 9999999999999999999999
                        if ($(span_arr).find(`i`).attr('class') === 'fa-solid fa-microphone') {
                            com_count = parseInt($(span_arr).text())
                        }
                    }
                }
                if (ep_count !== com_count) $(arr[i]).addClass('d-none')
            })
        }

        const airSub = async()=> {
            let arr = $('#body > div.profile-container > div > aside.main > div.watchlist.scaff.items .item')
            arr.map((i)=> {
                let ep_count = 0
                let com_count = 0
                let span_arr = $(arr[i]).find(`.info .detail .ep span`)
                if ($(span_arr).length > 1) {
                    span_arr.map((o)=> {
                        if (($(span_arr[o]).text()).includes('EPS')) {
                            ep_count = parseInt($(span_arr[o]).text())
                        }
                        if ($(span_arr[o]).find(`i`).attr('class') === 'fa-solid fa-closed-captioning') {
                            com_count = parseInt($(span_arr[o]).text())
                        }
                    })
                }
                else {
                    if (($(span_arr).text()).includes('EPS')) {
                        ep_count = parseInt($(span_arr).text())
                    } else {
                        ep_count = 9999999999999999999999
                        if ($(span_arr).find(`i`).attr('class') === 'fa-solid fa-closed-captioning') {
                            com_count = parseInt($(span_arr).text())
                        }
                    }
                }
                if (ep_count === com_count || com_count === 0) $(arr[i]).addClass('d-none')
            })
        }
        const airDub = async()=> {
            let arr = $('#body > div.profile-container > div > aside.main > div.watchlist.scaff.items .item')
            arr.map((i)=> {
                let ep_count = 0
                let com_count = 0
                let span_arr = $(arr[i]).find(`.info .detail .ep span`)
                if ($(span_arr).length > 1) {
                    span_arr.map((o)=> {
                        if (($(span_arr[o]).text()).includes('EPS')) {
                            ep_count = parseInt($(span_arr[o]).text())
                        }
                        if ($(span_arr[o]).find(`i`).attr('class') === 'fa-solid fa-microphone') {
                            com_count = parseInt($(span_arr[o]).text())
                        }
                    })
                }
                else {
                    if (($(span_arr).text()).includes('EPS')) {
                        ep_count = parseInt($(span_arr).text())
                    } else {
                        ep_count = 9999999999999999999999
                        if ($(span_arr).find(`i`).attr('class') === 'fa-solid fa-microphone') {
                            com_count = parseInt($(span_arr).text())
                        }
                    }
                }
                if (ep_count === com_count || com_count === 0) $(arr[i]).addClass('d-none')
            })
        }

        // Clicked Events
        $('#com-sub').click((e)=> {
            reset()
            $(e.target).addClass('cf-active')
            comSub()
        })
        $('#com-dub').click((e)=> {
            reset()
            $(e.target).addClass('cf-active')
            comDub()
        })
        $('#air-sub').click((e)=> {
            reset()
            $(e.target).addClass('cf-active')
            airSub()
        })
        $('#air-dub').click((e)=> {
            reset()
            $(e.target).addClass('cf-active')
            airDub()
        })
        $('#reset').click(reset)

    }, false);
})();














