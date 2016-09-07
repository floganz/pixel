class TargetsController < ApplicationController
  respond_to :json
  def create
    @target = Target.new target_params
    if @target.save
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :target => @target
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "create fail",
       }
    end
  end

  def update
    @target = Target.update params[:id], target_params
    if @target.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :target => @target
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @target = Target.find params[:id]
    if @target.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def index
    @targets = Target.with_count(params[:campaign_id])
    render json: @targets.map do |t|
      {
        id: t.id,
        name: t.name,
        visits: t.visits,
        unique: t.unique
      } 
    end
  end

  private
    def target_params
      params.require(:target).permit(:name, :campaign_id)
    end
end
