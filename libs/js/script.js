// assign event listeners


$('#editAlbumForm').on('submit', function (e) {
  e.preventDefault();
  editAlbums();
});
//Get all grid data


function getAllData() { 
    $.ajax({
      url: './libs/php/getAll.php',
      type: 'POST',
      dataType: 'json',
  
      success: function (result) {
        createAlbumTable(result.data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#editPersonnelModal .modal-title').replaceWith(
          'Error retrieving data'
        );
      },
    });
  }






function createAlbumTable(data) {
  
  
    $('#albumTableBody tr').remove();
  
   let value;
  
    var rows = "";
  
    data.forEach(function(item, index) {
  let id=item.albumID;
      value="<td class='text-end text-nowrap'>" +
      "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal'" +
      "data-bs-target='#editAlbumModal' data-id=" +
      id +
      '>' +
      "<i class='fa-solid fa-pencil fa-fw'></i>" +
      '</button>' +
      "<button type='button' class='btn btn-primary btn-sm deletePersonnelBtn ms-1' data-bs-toggle='modal'" +
      "data-bs-target='#deletePersonnelModal' data-id=" +
      id +
      '>' +
      "<i class='fa-solid fa-trash fa-fw'></i></button></td></tr>";
      
      rows += `<tr><td class='align-middle text-nowrap'>${item.albumName}</td><td class='align-middle text-nowrap d-none d-md-table-cell'>${item.artistName}</td> <td class='align-middle text-nowrap d-none d-md-table-cell'>${item.year_release}</td><td class= 'align-middle text-nowrap d-none d-md-table-cell'>${item.ranking}</td>`+value;  
      
    });
    
    $('#albumTableBody').append(rows);
  
  }
  getAllData();


  $('#editAlbumModal').on('show.bs.modal', function (e) {
    $.ajax({
      url: './libs/php/getAlbumsByID.php',
      type: 'POST',
      dataType: 'json',
      data: {
        albumID: $(e.relatedTarget).attr('data-id'), 
      },
      success: function (result) {
        console.log(result);
        var resultCode = result.status.code;
      
        if (resultCode == 200) {
         
  
          $('#editAlbumID').val(result.data[0].albumID);
  
          $('#editAlbumName').val(result.data[0].albumName);
          $('#editArtistName').val(result.data[0].artistName);
          $('#editReleaseYear').val(result.data[0].year_release);
  
          $('#editRanking').val(
            result.data[0].ranking
          );
         
         
         
         
        } else {
          $('#editAlbumModal .modal-title').replaceWith(
            'Error retrieving data'
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#editAlbumModal .modal-title').replaceWith(
          'Error retrieving data'
        );
      },
    });
  });


  function editAlbums() {
    $.ajax({
      url: './libs/php/editAlbums.php',
      type: 'POST',
      dataType: 'json',
      data: {
        albumName: $('#editAlbumName').val(),
        artistName: $('#editArtistName').val(),
        releaseYear: $('#editReleaseYear').val(),
        
        ranking: $('#editRanking').val(),
        albumID: $('#editAlbumID').val(),
      },
      success: function (result) {
        $('#editAlbumStatus').html(result.data);
        $('#editAlbumStatus').addClass('databaseStatus');
       
       
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#editAlbumModal .modal-title').replaceWith('Error retrieving data');
      },
    });
    setTimeout(function() {$('#editAlbumModal').modal('hide');}, 3000);
  }
  