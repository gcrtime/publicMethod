/* 数据导出excel表格 */
export function exportExcel(columns: any, dataSource: any, linkName: string) {
   // 处理数据
   const newDataSource: any = [];
   dataSource.map((item: any, index: any) => {
    const tep = {} as any;
    columns.forEach((filter: any) => {
      tep[filter.dataIndex] = dataSource[index][filter.dataIndex];
    });
    newDataSource.push(tep);
   });
   /* for (let i = 0; i < dataSource.length; i++) {
     const tep = {} as any;
     columns.forEach((filter: any) => {
       tep[filter.dataIndex] = dataSource[i][filter.dataIndex];
     });
     newDataSource.push(tep);
   } */
   let str = '<tr>';
   columns.map((item: any, index: any) => {
    str += `<td>${columns[index].title + '\t'}</td>`;
   });
   /* for (let i = 0; i < columns.length; i++) {
      str += `<td>${columns[i].title + '\t'}</td>`;
    } */
   str += '</tr>';
   str += '<tr>';
   if (newDataSource && newDataSource.length !== 0) {
    newDataSource.map((item: any, index: any) => {
      for (const sitem in newDataSource[index]) {
        if ( newDataSource[index].hasOwnProperty(sitem)) {
          const news = newDataSource[index][sitem] ? newDataSource[index][sitem] : '';
          // style="mso-number-format:\'@\'" =>excel科学计数
          str += `<td style="mso-number-format:\'@\'">${news + '\t'}</td>`;
        }
      }
      str += '</tr>';
     });
    }
   /* for (let i = 0; i < newDataSource.length; i++) {
      for (const item in newDataSource[i]) {
        const news = newDataSource[i][item] ? newDataSource[i][item] : '';
        // style="mso-number-format:\'@\'" =>excel科学计数
        str += `<td style="mso-number-format:\'@\'">${news + '\t'}</td>`;
      }
      str += '</tr>';
    } */
   const worksheet = linkName ? linkName : 'sheet'; // 下载之后excel下标显示名称（linkName是自己定义的名称）
   const uri = 'data:application/vnd.ms-excel;base64,';
   const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
      </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body><table>${str}</table></body></html>`;
   const base64 = (s: any) => {
    return window.btoa(unescape(encodeURIComponent(s)));
   };
   const link = document.createElement('a');
   link.href = uri + base64(template);
   link.download = linkName ? linkName : 'download.xls'; // 当前下载的excel名称
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
 }
