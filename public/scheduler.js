/**
 * 实现这样一个函数scheduler，函数入参为并发最大次数。
 * 如下最终输出顺序： 2、3、 1、 4
 * 一开始，1、2两个任务进入队列
 * 500ms时，2完成，输出2，任务3进队
 * 800ms时，3完成，输出3，任务4进队
 * 1000ms时，1完成，输出1
 * 1200ms时，4完成，输出4
 */
function scheduler(maxLimit) {
  // 正在执行的任务数量
  let runningCount = 0;
  // 等待执行的任务队列
  const taskQueue = [];

  // 核心：执行任务的递归函数
  const runTask = async () => {
    // 队列空 或 达到最大并发，停止执行
    if (taskQueue.length === 0 || runningCount >= maxLimit) return;

    // 取出队列第一个任务
    const task = taskQueue.shift();
    runningCount++; // 执行数+1

    // 等待任务执行完成
    await task();

    // 任务执行完毕，执行数-1
    runningCount--;
    // 递归执行下一个任务（补位）
    runTask();
  };

  // 返回添加任务的方法
  return (task) => {
    taskQueue.push(task); // 任务入队
    runTask(); // 尝试执行任务
  };
}

// ============== 测试用例 ==============
// 创建最大并发为2的调度器
const addTask = scheduler(2);

/**
 * 生成异步任务（模拟请求）
 * @param {number} delay 延迟时间
 * @param {number} num 任务编号
 * @returns {Function} 异步任务函数
 */
const createTask = (delay, num) => {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(num); // 任务完成后输出编号
        resolve();
      }, delay);
    });
};

// 按照题目要求添加任务：1、2先入队，后续3、4入队
addTask(createTask(1000, 1)); // 任务1
addTask(createTask(500, 2)); // 任务2
addTask(createTask(300, 3)); // 任务3
addTask(createTask(400, 4)); // 任务4
