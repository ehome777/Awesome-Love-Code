document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const titleInput = document.getElementById('title');
    const subtitleInput = document.getElementById('subtitle');
    const contentInput = document.getElementById('content');
    const templateOption = document.getElementById('templateOption');
    const urlOption = document.getElementById('urlOption');
    const localOption = document.getElementById('localOption');
    const templateSelection = document.getElementById('templateSelection');
    const imageUrlInput = document.getElementById('imageUrl');
    const localImageInput = document.getElementById('localImage');
    const templateImages = document.querySelectorAll('.template-img');
    const bgColorInput = document.getElementById('bgColor');
    const titleFontSizeSelect = document.getElementById('titleFontSize');
    const titleFontColorInput = document.getElementById('titleFontColor');
    const subtitleFontSizeSelect = document.getElementById('subtitleFontSize');
    const subtitleFontColorInput = document.getElementById('subtitleFontColor');
    const contentFontSizeSelect = document.getElementById('contentFontSize');
    const contentFontColorInput = document.getElementById('contentFontColor');
    const titlePositionInput = document.getElementById('titlePosition');
    const titlePositionValue = document.getElementById('titlePositionValue');
    const subtitlePositionInput = document.getElementById('subtitlePosition');
    const subtitlePositionValue = document.getElementById('subtitlePositionValue');
    const contentPositionInput = document.getElementById('contentPosition');
    const contentPositionValue = document.getElementById('contentPositionValue');
    const posterTitle = document.getElementById('posterTitle');
    const posterSubtitle = document.getElementById('posterSubtitle');
    const posterContent = document.getElementById('posterContent');
    const poster = document.getElementById('poster');
    let selectedTemplate = 'bg1.png';
    let backgroundImageData = null;
    
    // 模板图片选择
    templateImages.forEach(img => {
        img.addEventListener('click', function() {
            // 移除所有选中状态
            templateImages.forEach(i => i.classList.remove('selected'));
            // 添加选中状态
            this.classList.add('selected');
            // 保存选中的模板
            selectedTemplate = this.getAttribute('data-src');
        });
    });
    
    // 标题位置滑块值显示
    titlePositionInput.addEventListener('input', function() {
        titlePositionValue.textContent = this.value + 'px';
    });
    
    // 副标题位置滑块值显示
    subtitlePositionInput.addEventListener('input', function() {
        subtitlePositionValue.textContent = this.value + 'px';
    });
    
    // 内容位置滑块值显示
    contentPositionInput.addEventListener('input', function() {
        contentPositionValue.textContent = this.value + 'px';
    });
    
    // 切换图片输入方式
    templateOption.addEventListener('change', function() {
        if (this.checked) {
            templateSelection.style.display = 'block';
            imageUrlInput.style.display = 'none';
            localImageInput.style.display = 'none';
        }
    });
    
    urlOption.addEventListener('change', function() {
        if (this.checked) {
            templateSelection.style.display = 'none';
            imageUrlInput.style.display = 'block';
            localImageInput.style.display = 'none';
            imageUrlInput.placeholder = '请输入背景图片URL';
        }
    });
    
    localOption.addEventListener('change', function() {
        if (this.checked) {
            templateSelection.style.display = 'none';
            imageUrlInput.style.display = 'none';
            localImageInput.style.display = 'block';
            // 显示上传模板按钮
            uploadTemplateSection.style.display = 'block';
        }
    });
    
    // 处理本地图片选择
    localImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                backgroundImageData = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 上传模板功能
    const uploadTemplateSection = document.getElementById('uploadTemplateSection');
    const uploadTemplateBtn = document.getElementById('uploadTemplateBtn');
    
    uploadTemplateBtn.addEventListener('click', function() {
        if (localImageInput.files.length > 0) {
            alert('在Web应用中无法真正保存上传的文件为模板。在实际部署的服务器环境中，这里会将图片保存到服务器并添加到模板列表中。');
            // 在实际应用中，这里会发送AJAX请求将文件上传到服务器
            // 并将新模板添加到模板列表中
        } else {
            alert('请先选择要上传的图片文件');
        }
    });
    
    // 生成海报
    generateBtn.addEventListener('click', function() {
        // 获取输入值
        const title = titleInput.value || '标题';
        const subtitle = subtitleInput.value || '副标题';
        const content = contentInput.value || '内容';
        const bgColor = bgColorInput.value;
        
        // 获取字体设置
        const titleFontSize = titleFontSizeSelect.value;
        const titleFontColor = titleFontColorInput.value;
        const subtitleFontSize = subtitleFontSizeSelect.value;
        const subtitleFontColor = subtitleFontColorInput.value;
        const contentFontSize = contentFontSizeSelect.value;
        const contentFontColor = contentFontColorInput.value;
        const titlePosition = titlePositionInput.value;
        const subtitlePosition = subtitlePositionInput.value;
        const contentPosition = contentPositionInput.value;
        
        // 更新海报内容
        posterTitle.textContent = title;
        posterSubtitle.textContent = subtitle;
        posterContent.textContent = content;
        
        // 设置独立字体样式
        posterTitle.style.fontSize = titleFontSize;
        posterTitle.style.color = titleFontColor;
        
        posterSubtitle.style.fontSize = subtitleFontSize;
        posterSubtitle.style.color = subtitleFontColor;
        
        posterContent.style.fontSize = contentFontSize;
        posterContent.style.color = contentFontColor;
        
        // 设置独立元素位置
        // 标题位置只受titlePosition影响
        posterTitle.style.transform = `translate(-50%, calc(-50% + ${titlePosition}px))`;
        
        // 副标题位置相对于海报中心固定偏移
        posterSubtitle.style.top = `calc(50% + ${subtitlePosition}px)`;
        
        // 内容位置相对于副标题位置固定偏移
        posterContent.style.top = `calc(50% + ${contentPosition}px)`;
        
        // 设置背景
        if (templateOption.checked) {
            // 使用模板图片
            poster.style.backgroundImage = `url('${selectedTemplate}')`;
            poster.style.backgroundColor = '';
            backgroundImageData = null;
        } else if (urlOption.checked && imageUrlInput.value) {
            const imageUrl = imageUrlInput.value;
            // 检查图片URL是否有效
            const img = new Image();
            img.onload = function() {
                poster.style.backgroundImage = `url('${imageUrl}')`;
                backgroundImageData = null;
            };
            img.onerror = function() {
                alert('图片URL无效，将使用纯色背景');
                poster.style.backgroundImage = 'none';
                poster.style.backgroundColor = bgColor;
                backgroundImageData = null;
            };
            img.src = imageUrl;
        } else if (localOption.checked && backgroundImageData) {
            poster.style.backgroundImage = `url('${backgroundImageData}')`;
            poster.style.backgroundColor = '';
        } else {
            poster.style.backgroundImage = 'none';
            poster.style.backgroundColor = bgColor;
        }
    });
    
    // 下载海报
    downloadBtn.addEventListener('click', function() {
        // 检查html2canvas是否已加载
        if (typeof html2canvas === 'undefined') {
            alert('海报生成库尚未加载完成，请稍后再试');
            return;
        }
        
        console.log('开始生成海报...');
        
        // 创建canvas元素
        html2canvas(poster).then(function(canvas) {
            console.log('海报生成成功');
            
            // 生成默认文件名：标题+当前日期
            const title = titleInput.value || '海报';
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const filename = `${title}_${year}${month}${day}.png`;
            
            // 简化且可靠的下载方法
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataURL;
            link.style.display = 'none';
            
            // 添加到DOM，点击，然后移除
            document.body.appendChild(link);
            
            // 使用setTimeout确保在某些浏览器中正确执行
            setTimeout(function() {
                try {
                    link.click();
                    console.log('海报下载成功');
                } catch (e) {
                    console.error('下载失败，尝试备选方案:', e);
                    // 如果click方法失败，尝试其他方法
                    if (document.createEvent) {
                        const event = document.createEvent('MouseEvents');
                        event.initEvent('click', true, true);
                        link.dispatchEvent(event);
                    } else {
                        // 最后的兜底方案
                        window.open(dataURL, '_blank');
                    }
                }
                
                // 安全地移除元素
                if (link.parentNode) {
                    document.body.removeChild(link);
                }
                
                // 释放内存
                link.href = '';
            }, 100);
        }).catch(function(error) {
            console.error('生成海报失败:', error);
            alert('生成海报失败，请重试或更换浏览器');
        });
    });
});

// 引入html2canvas库
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 加载html2canvas库并在加载完成后初始化功能
// 使用多个CDN源作为备选
const cdnSources = [
    'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
    'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js'
];

function loadHtml2Canvas() {
    let sourceIndex = 0;
    
    function tryNextSource() {
        if (sourceIndex >= cdnSources.length) {
            console.error('所有CDN源都加载失败');
            alert('海报生成库加载失败，请检查网络连接后刷新页面');
            return;
        }
        
        loadScript(cdnSources[sourceIndex])
            .then(() => {
                console.log('html2canvas库加载成功，来源:', cdnSources[sourceIndex]);
                // 库加载成功后启用下载按钮
                const downloadBtn = document.getElementById('downloadBtn');
                if (downloadBtn) {
                    downloadBtn.disabled = false;
                }
            })
            .catch((error) => {
                console.warn('CDN源加载失败:', cdnSources[sourceIndex], error);
                sourceIndex++;
                tryNextSource();
            });
    }
    
    tryNextSource();
}

// 页面加载完成后开始加载库
document.addEventListener('DOMContentLoaded', function() {
    loadHtml2Canvas();
});