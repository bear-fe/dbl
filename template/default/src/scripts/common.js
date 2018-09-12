
/**  
 * 项目公共js文件
 * @exports none  
 */

require('@/css/style.css')

// 工具类样式放在所有样式最后
require('@/css/utilities.css')

if (window.respond && !window.respond.mediaQueriesSupported) window.respond.update()
