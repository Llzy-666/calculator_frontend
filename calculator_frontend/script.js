const baseUrl = "http://111.230.148.219:9000"
let currentPage = 1;
const pageSize = 5;
let inputBuffer = "";
// 追加字符到输入框
function append(s) {
    inputBuffer += s;
    document.getElementById("inputExpr").value = inputBuffer;
}
// CE：删除最后一个字符（退格，只删末尾，保留前面表达式）
function clearEntry() {
    inputBuffer = inputBuffer.slice(0, -1);
    document.getElementById("inputExpr").value = inputBuffer;
}
// C：全部清空，重置整个表达式
function clearAll() {
    inputBuffer = "";
    document.getElementById("inputExpr").value = inputBuffer;
}
// 提交计算
async function calcSubmit() {
    let expr = document.getElementById("inputExpr").value;
    expr = expr.replace(/×/g, "*").replace(/÷/g, "/");
    if (!expr) return;
    const res = await fetch(`${baseUrl}/api/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: expr })
    })
    const data = await res.json();
    if (data.code === 200) {
        document.getElementById("inputExpr").value = data.result;
        inputBuffer = String(data.result);
        loadHistory();
    } else {
        alert("表达式错误！");
    }
}
// 加载历史记录
async function loadHistory() {
    const keyword = document.getElementById("searchKey").value;
    const resp = await fetch(`${baseUrl}/api/history?page=${currentPage}&size=${pageSize}&keyword=${keyword}`);
    const json = await resp.json();
    const listDom = document.getElementById("historyList");
    listDom.innerHTML = "";
    json.data.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <span>${item.time} | ${item.expr} = ${item.result}</span>
            <button onclick="delHistory(${item.id})">删除</button>
        `;
        listDom.appendChild(div);
    })
    document.getElementById("pageInfo").innerText = `第${json.page}/${json.totalPage}页，共${json.total}条`;
    document.getElementById("prevBtn").disabled = currentPage <= 1;
    document.getElementById("nextBtn").disabled = currentPage >= json.totalPage;
}
async function delHistory(id) {
    await fetch(`${baseUrl}/api/history/${id}`, { method: "DELETE" });
    loadHistory();
}
async function clearAllHistory() {
    await fetch(`${baseUrl}/api/history`, { method: "DELETE" });
    loadHistory();
}
function prevPage() { currentPage--; loadHistory(); }
function nextPage() { currentPage++; loadHistory(); }
// 页面加载自动拉取历史
loadHistory();
