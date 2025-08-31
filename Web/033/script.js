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
        
        // 更新海报内容
        posterTitle.textContent = title;
        posterSubtitle.textContent = subtitle;
        posterContent.textContent = content;
        
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
        
        // 启用下载按钮
        downloadBtn.disabled = false;
    });
    
    // 下载海报
    downloadBtn.addEventListener('click', function() {
        // 创建canvas元素
        html2canvas(poster).then(function(canvas) {
            // 将canvas转换为图片并下载
            const link = document.createElement('a');
            link.download = '海报.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
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

// 加载html2canvas库
loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');